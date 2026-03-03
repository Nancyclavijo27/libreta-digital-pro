// controllers/dashboardController.js

import Venta from "../models/Venta.js";
import Cliente from "../models/Cliente.js";
import Product from "../models/Product.js";
import { Op } from "sequelize";

export const getDashboardDueno = async (req, res) => {
  try {
    const hoy = new Date().toISOString().split("T")[0];

    const ventasHoy = await Venta.sum("total", {
      where: {
        negocio_id: req.negocio_id,
        fecha: hoy,
      },
    });

    const totalCredito = await Cliente.sum("saldo_deuda", {
      where: {
        negocio_id: req.negocio_id,
      },
    });

    const clientesConDeuda = await Cliente.count({
      where: {
        negocio_id: req.negocio_id,
        saldo_deuda: { [Op.gt]: 0 },
      },
    });

    const productosBajoStock = await Product.count({
      where: {
        negocio_id: req.negocio_id,
        stock: { [Op.lte]: 5 },
      },
    });

    res.json({
      ventas_hoy: ventasHoy || 0,
      total_credito_pendiente: totalCredito || 0,
      clientes_con_deuda: clientesConDeuda,
      productos_bajo_stock: productosBajoStock,
    });

  } catch (error) {
    console.error("Error dashboard:", error);
    res.status(500).json({ message: "Error interno" });
  }
};