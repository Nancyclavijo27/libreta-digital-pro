import Venta from "../models/Venta.js";
import DetalleVenta from "../models/DetalleVenta.js";
import Product from "../models/Product.js";
import Cliente from "../models/Cliente.js";

/* =========================
   CREAR VENTA
========================= */
export const createVenta = async (req, res) => {
  try {
    const { productos, tipo_pago, cliente_id } = req.body;

    // 🔹 Validaciones
    if (!productos || productos.length === 0) {
      return res.status(400).json({
        message: "Debe enviar al menos un producto",
      });
    }

    if (!tipo_pago) {
      return res.status(400).json({
        message: "Debe indicar tipo_pago",
      });
    }

    if (tipo_pago === "credito" && !cliente_id) {
      return res.status(400).json({
        message: "Debe seleccionar cliente",
      });
    }

    // 🔹 Fecha y hora
    const ahora = new Date();
    const fecha = new Date().toLocaleDateString("sv-SE");
    const hora = ahora.toTimeString().split(" ")[0];

    let totalVenta = 0;

    // 🔹 Crear venta base
    const nuevaVenta = await Venta.create({
      fecha,
      hora,
      total: 0,
      tipo_pago,
      estado: tipo_pago === "credito" ? "pendiente" : "completada",
      negocio_id: req.negocio_id,
      usuario_id: req.user.id,
      cliente_id: tipo_pago === "credito" ? cliente_id : null,
    });

    // 🔥 Procesar productos
    for (const item of productos) {
      const { producto_id, cantidad, precio_unitario } = item;

      const producto = await Product.findOne({
        where: {
          id: producto_id,
          negocio_id: req.negocio_id,
        },
      });

      if (!producto) {
        return res.status(404).json({
          message: `Producto ${producto_id} no encontrado`,
        });
      }

      // 🔴 VALIDACIÓN DE STOCK
      if (producto.stock < cantidad) {
        return res.status(400).json({
          message: `Stock insuficiente para ${producto.nombre}`,
        });
      }

      const subtotal =
        Number(cantidad) * Number(precio_unitario);

      totalVenta += subtotal;

      await DetalleVenta.create({
        venta_id: nuevaVenta.id,
        producto_id,
        cantidad: Number(cantidad),
        precio_unitario: Number(precio_unitario),
        subtotal,
      });

      // 🔥 Descontar stock
      producto.stock -= Number(cantidad);
      await producto.save();
    }

    // 🔹 Actualizar total
    nuevaVenta.total = totalVenta;
    await nuevaVenta.save();

    // 🔥 SUMAR DEUDA AL CLIENTE (CLAVE)
    if (tipo_pago === "credito") {
      const cliente = await Cliente.findOne({
        where: {
          id: cliente_id,
          negocio_id: req.negocio_id,
        },
      });

      if (cliente) {
        const saldoActual = Number(cliente.saldo_deuda || 0);
        const nuevoSaldo = saldoActual + totalVenta;

        cliente.saldo_deuda = nuevoSaldo;

        await cliente.save();
      }
    }

    return res.status(201).json({
      message: "Venta registrada",
      total: totalVenta,
    });

  } catch (error) {
    console.error("🔥 Error createVenta:", error);
    res.status(500).json({ message: "Error servidor" });
  }
};


/* =========================
   LISTAR VENTAS
========================= */
export const getVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      where: { negocio_id: req.negocio_id },
      include: [
        {
          model: DetalleVenta,
          include: [Product],
        },
        {
          model: Cliente,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(ventas);

  } catch (error) {
    console.error("🔥 Error getVentas:", error);
    res.status(500).json({ message: "Error" });
  }
};