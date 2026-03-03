// controllers/clienteController.js

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
   Listar Clientes con deuda
========================= */
export const getClientesConDeuda = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      where: {
        negocio_id: req.negocio_id,
        saldo_deuda: { [Op.gt]: 0 },
        activo: true,
      },
      order: [["saldo_deuda", "DESC"]],
    });

    res.json(clientes);

  } catch (error) {
    console.error("Error getClientesConDeuda:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/* =========================
   Detalle Cliente
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
          order: [["createdAt", "DESC"]],
        },
        {
          model: Pago,
          order: [["createdAt", "DESC"]],
        }
      ],
    });

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json(cliente);

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