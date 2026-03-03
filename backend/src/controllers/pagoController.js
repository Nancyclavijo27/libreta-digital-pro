// controllers/pagoController.js

import Pago from "../models/Pago.js";
import Venta from "../models/Venta.js";
import Cliente from "../models/Cliente.js";

export const registrarPago = async (req, res) => {
  try {
    const { venta_id, monto } = req.body;

    if (!venta_id || !monto) {
      return res.status(400).json({
        message: "Venta y monto son obligatorios",
      });
    }

    const venta = await Venta.findOne({
      where: {
        id: venta_id,
        negocio_id: req.negocio_id,
      },
    });

    if (!venta) {
      return res.status(404).json({
        message: "Venta no encontrada",
      });
    }

    if (venta.tipo_pago !== "credito") {
      return res.status(400).json({
        message: "Esta venta no es a crédito",
      });
    }

    // 🔥 Crear pago
    const nuevoPago = await Pago.create({
      venta_id,
      monto,
      cliente_id: venta.cliente_id,
      usuario_id: req.user.id,
      negocio_id: req.negocio_id,
      fecha: new Date(),
      hora: new Date(),
    });

    // 🔥 Calcular total pagado
    const pagos = await Pago.findAll({
      where: { venta_id },
    });

    const totalPagado = pagos.reduce(
      (acc, pago) => acc + parseFloat(pago.monto),
      0
    );

    const saldo = parseFloat(venta.total) - totalPagado;

    // 🔥 Actualizar estado venta
    if (saldo <= 0) {
      await venta.update({ estado: "pagada" });
    }

    // 🔥 ACTUALIZAR SALDO CLIENTE (AQUÍ VA)
    const cliente = await Cliente.findOne({
      where: {
        id: venta.cliente_id,
        negocio_id: req.negocio_id,
      },
    });

    if (cliente) {
      cliente.saldo_deuda =
        parseFloat(cliente.saldo_deuda) - parseFloat(monto);

      if (cliente.saldo_deuda < 0) {
        cliente.saldo_deuda = 0;
      }

      await cliente.save();
    }

    return res.status(201).json({
      message: "Pago registrado correctamente",
      pago: nuevoPago,
      saldo_restante: saldo > 0 ? saldo : 0,
    });

  } catch (error) {
    console.error("Error registrarPago:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};