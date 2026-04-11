import { Op } from "sequelize";

import Cliente from "../models/Cliente.js";
import Venta from "../models/Venta.js";
import Product from "../models/Product.js";
import DetalleVenta from "../models/DetalleVenta.js";

export const getDashboardDueno = async (req, res) => {
  try {
    const hoy = new Date().toLocaleDateString("sv-SE");

    // 💰 Total deuda
    const totalCredito = await Cliente.sum("saldo_deuda", {
      where: { negocio_id: req.negocio_id },
    });

    // 👥 Clientes con deuda
    const clientesConDeuda = await Cliente.count({
      where: {
        negocio_id: req.negocio_id,
        saldo_deuda: { [Op.gt]: 0 },
      },
    });

    // 💵 Ventas hoy (dinero)
    const ventasHoy = await Venta.sum("total", {
      where: {
        negocio_id: req.negocio_id,
        fecha: hoy,
      },
    });

    // 🧾 Cantidad de ventas hoy
    const cantidadVentasHoy = await Venta.count({
      where: {
        negocio_id: req.negocio_id,
        fecha: hoy,
      },
    });

    // 📦 Productos con stock bajo (<=5)
    const productosBajoStock = await Product.count({
      where: {
        negocio_id: req.negocio_id,
        stock: { [Op.lte]: 5 },
      },
    });

    // 🔥 Última venta
    const ultimaVenta = await Venta.findOne({
      where: { negocio_id: req.negocio_id },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: DetalleVenta,
          include: [Product],
        },
      ],
    });

    res.json({
      ventas_hoy: ventasHoy || 0,
      total_credito_pendiente: totalCredito || 0,
      clientes_con_deuda: clientesConDeuda || 0,
      productos_bajo_stock: productosBajoStock || 0,

      cantidad_ventas_hoy: cantidadVentasHoy || 0,

      ultima_venta: ultimaVenta
        ? {
            total: ultimaVenta.total,
            producto:
              ultimaVenta.DetalleVenta?.[0]?.Product?.nombre || "Producto",
          }
        : null,
    });

  } catch (error) {
    console.error("Error dashboard:", error);
    res.status(500).json({ message: "Error interno" });
  }
};