import Cliente from "../models/Cliente.js";
import Venta from "../models/Venta.js";
import Pago from "../models/Pago.js";
import { Op } from "sequelize";

/* =========================
   Crear Cliente
========================= */
export const createCliente = async (req, res) => {
  try {
    const { nombre, telefono, direccion } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: "Nombre es obligatorio" });
    }

    const cliente = await Cliente.create({
      nombre,
      telefono,
      direccion,
      negocio_id: req.negocio_id,
    });

    res.status(201).json(cliente);

  } catch (error) {
    console.error("Error createCliente:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


/* =========================
   Listar TODOS los clientes
========================= */
export const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      where: {
        negocio_id: req.negocio_id,
        activo: true,
      },
      order: [["createdAt", "DESC"]],
    });

    res.json(clientes);

  } catch (error) {
    console.error("Error getClientes:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


/* =========================
   Listar Clientes con deuda (REAL)
========================= */
export const getClientesConDeuda = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      where: {
        negocio_id: req.negocio_id,
        activo: true,
      },
      include: [
        {
          model: Venta,
          where: { tipo_pago: "credito" },
          required: false,
          include: [Pago],
        },
      ],
    });

    // 🔥 CALCULAR DEUDA REAL
    const clientesConDeuda = clientes.map((cliente) => {
      let totalPendiente = 0;

      cliente.Venta?.forEach((venta) => {
        const total = parseFloat(venta.total);

        const pagado = venta.Pagos?.reduce(
          (acc, pago) => acc + parseFloat(pago.monto),
          0
        ) || 0;

        const saldo = total - pagado;

        if (saldo > 0) {
          totalPendiente += saldo;
        }
      });

      return {
        id: cliente.id,
        nombre: cliente.nombre,
        saldo_deuda: totalPendiente,
      };
    });

    // 🔥 SOLO LOS QUE DEBEN
    const resultado = clientesConDeuda.filter(c => c.saldo_deuda > 0);

    res.json(resultado);

  } catch (error) {
    console.error("Error getClientesConDeuda:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


/* =========================
   Detalle Cliente (CORRECTO)
========================= */
export const getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findOne({
      where: {
        id: req.params.id,
        negocio_id: req.negocio_id,
      },
      include: [
        {
          model: Venta,
          include: [Pago],
          order: [["createdAt", "DESC"]],
        },
      ],
    });

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // 🔥 CALCULAR TODO AQUÍ
    let totalPendiente = 0;

    const ventasProcesadas = cliente.Venta.map((venta) => {
      const total = parseFloat(venta.total);

      const pagado = venta.Pagos?.reduce(
        (acc, pago) => acc + parseFloat(pago.monto),
        0
      ) || 0;

      const saldo = total - pagado;

      if (saldo > 0) {
        totalPendiente += saldo;
      }

      return {
        ...venta.toJSON(),
        total,
        pagado,
        saldo,
      };
    });

    res.json({
      ...cliente.toJSON(),
      saldo_deuda: totalPendiente, // 🔥 REAL
      Venta: ventasProcesadas,
    });

  } catch (error) {
    console.error("Error getClienteById:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


/* =========================
   Actualizar Cliente
========================= */
export const updateCliente = async (req, res) => {
  try {
    const { nombre, telefono, direccion } = req.body;

    const cliente = await Cliente.findOne({
      where: {
        id: req.params.id,
        negocio_id: req.negocio_id,
      },
    });

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    await cliente.update({
      nombre,
      telefono,
      direccion,
    });

    res.json({ message: "Cliente actualizado correctamente" });

  } catch (error) {
    console.error("Error updateCliente:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


/* =========================
   Desactivar Cliente
========================= */
export const deactivateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findOne({
      where: {
        id: req.params.id,
        negocio_id: req.negocio_id,
      },
    });

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    await cliente.update({ activo: false });

    res.json({ message: "Cliente desactivado correctamente" });

  } catch (error) {
    console.error("Error deactivateCliente:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};