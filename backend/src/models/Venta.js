// models/Venta.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Negocio from "./Negocio.js";
import User from "./User.js";
import Cliente from "./Cliente.js";

const Venta = sequelize.define("Venta", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },

  total: {
    type: DataTypes.DECIMAL(12,2),
    allowNull: false,
  },

  tipo_pago: {
    type: DataTypes.ENUM("contado", "credito"),
    allowNull: false,
  },

  estado: {
    type: DataTypes.ENUM("completada", "pendiente", "pagada", "anulada"),
    defaultValue: "completada",
  },

  negocio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

}, {
  timestamps: true,
});

Negocio.hasMany(Venta, { foreignKey: "negocio_id" });
Venta.belongsTo(Negocio, { foreignKey: "negocio_id" });

User.hasMany(Venta, { foreignKey: "usuario_id" });
Venta.belongsTo(User, { foreignKey: "usuario_id" });

Cliente.hasMany(Venta, { foreignKey: "cliente_id" });
Venta.belongsTo(Cliente, { foreignKey: "cliente_id" });

export default Venta;