import Pago from "../models/Pago.js";
import Venta from "../models/Venta.js";
import Cliente from "../models/Cliente.js";

export const registrarPago = async (req, res) => {
  try {
    const { venta_id, monto } = req.body;

    // 🔹 Validación básica
    if (!venta_id || !monto) {
      return res.status(400).json({
        message: "Venta y monto son obligatorios",
      });
    }

    // 🔹 Buscar venta
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

    // 🔥 FECHA Y HORA CORRECTAS (AQUÍ VA)
    const ahora = new Date();

    const fecha = ahora.toISOString().split("T")[0]; // YYYY-MM-DD
    const hora = ahora.toTimeString().split(" ")[0]; // HH:mm:ss

    // 🔥 Crear pago (SIN ERROR)
    const nuevoPago = await Pago.create({
      venta_id,
      monto: parseFloat(monto),
      cliente_id: venta.cliente_id,
      usuario_id: req.user.id,
      negocio_id: req.negocio_id,
      fecha,
      hora,
    });

    // 🔥 Calcular total pagado
    const pagos = await Pago.findAll({
      where: { venta_id },
    });

    const totalPagado = pagos.reduce(
      (acc, pago) => acc + parseFloat(pago.monto),
      0
    );

    const totalVenta = parseFloat(venta.total);
    const saldo = totalVenta - totalPagado;

    // 🔥 Actualizar estado venta
    if (saldo <= 0) {
      await venta.update({ estado: "pagada" });
    }

    // 🔥 ACTUALIZAR SALDO CLIENTE
    const cliente = await Cliente.findOne({
      where: {
        id: venta.cliente_id,
        negocio_id: req.negocio_id,
      },
    });

    if (cliente) {
      const saldoActual = parseFloat(cliente.saldo_deuda || 0);
      const nuevoSaldo = saldoActual - parseFloat(monto);

      cliente.saldo_deuda = nuevoSaldo < 0 ? 0 : nuevoSaldo;

      await cliente.save();
    }

    return res.status(201).json({
      message: "Pago registrado correctamente",
      pago: nuevoPago,
      saldo_restante: saldo > 0 ? saldo : 0,
    });

  } catch (error) {
    console.error("🔥 Error registrarPago:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};