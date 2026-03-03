// controllers/ventaController.js

import Venta from "../models/Venta.js";
import DetalleVenta from "../models/DetalleVenta.js";
import Product from "../models/Product.js";
import Cliente from "../models/Cliente.js";

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
        message: "Debe indicar tipo_pago (contado o credito)",
      });
    }

    // 🔥 VALIDACIÓN OBLIGATORIA
    if (tipo_pago === "credito" && !cliente_id) {
      return res.status(400).json({
        message: "Debe seleccionar cliente para venta a crédito",
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

      const subtotal =
        parseFloat(cantidad) * parseFloat(precio_unitario);

      totalVenta += subtotal;

      await DetalleVenta.create({
        venta_id: nuevaVenta.id,
        producto_id,
        cantidad,
        precio_unitario,
        subtotal,
      });

      producto.stock =
        parseFloat(producto.stock) - parseFloat(cantidad);

      await producto.save();
    }

    nuevaVenta.total = totalVenta;
    await nuevaVenta.save();

    // 🔥 SUMAR DEUDA CLIENTE
    if (tipo_pago === "credito") {
      const cliente = await Cliente.findOne({
        where: {
          id: cliente_id,
          negocio_id: req.negocio_id,
        },
      });

      if (cliente) {
        cliente.saldo_deuda =
          parseFloat(cliente.saldo_deuda) + totalVenta;

        await cliente.save();
      }
    }

    return res.status(201).json({
      message: "Venta registrada correctamente",
      venta_id: nuevaVenta.id,
      total: totalVenta,
    });

  } catch (error) {
    console.error("Error creando venta:", error);
    return res.status(500).json({
      message: "Error del servidor",
    });
  }
};