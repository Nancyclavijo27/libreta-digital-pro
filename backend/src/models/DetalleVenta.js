// models/DetalleVenta.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Venta from "./Venta.js";
import Producto from "./Producto.js";

const DetalleVenta = sequelize.define("DetalleVenta", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  cantidad: {
    type: DataTypes.DECIMAL(12,2),
    allowNull: false,
  },

  precio_unitario: {
    type: DataTypes.DECIMAL(12,2),
    allowNull: false,
  },

  subtotal: {
    type: DataTypes.DECIMAL(12,2),
    allowNull: false,
  },

  venta_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

}, {
  timestamps: false,
});

Venta.hasMany(DetalleVenta, { foreignKey: "venta_id" });
DetalleVenta.belongsTo(Venta, { foreignKey: "venta_id" });

Producto.hasMany(DetalleVenta, { foreignKey: "producto_id" });
DetalleVenta.belongsTo(Producto, { foreignKey: "producto_id" });

export default DetalleVenta;