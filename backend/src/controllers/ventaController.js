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

    const fechaActual = new Date();
    const fecha = fechaActual.toISOString().split("T")[0];
    const hora = fechaActual.toTimeString().split(" ")[0];

    let totalVenta = 0;

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

      const subtotal = cantidad * precio_unitario;
      totalVenta += subtotal;

      await DetalleVenta.create({
        venta_id: nuevaVenta.id,
        producto_id,
        cantidad,
        precio_unitario,
        subtotal,
      });

      producto.stock -= cantidad;
      await producto.save();
    }

    nuevaVenta.total = totalVenta;
    await nuevaVenta.save();

    if (tipo_pago === "credito") {
      const cliente = await Cliente.findOne({
        where: {
          id: cliente_id,
          negocio_id: req.negocio_id,
        },
      });

      if (cliente) {
        cliente.saldo_deuda += totalVenta;
        await cliente.save();
      }
    }

    return res.status(201).json({
      message: "Venta registrada",
      total: totalVenta,
    });

  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.status(500).json({ message: "Error" });
  }
};