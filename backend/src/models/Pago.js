// models/Pago.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Venta from "./Venta.js";
import Cliente from "./Cliente.js";
import User from "./User.js";
import Negocio from "./Negocio.js";

const Pago = sequelize.define("Pago", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  monto: {
    type: DataTypes.DECIMAL(12,2),
    allowNull: false,
  },

  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },

  negocio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  venta_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

}, {
  timestamps: true,
});

Venta.hasMany(Pago, { foreignKey: "venta_id" });
Pago.belongsTo(Venta, { foreignKey: "venta_id" });

Cliente.hasMany(Pago, { foreignKey: "cliente_id" });
Pago.belongsTo(Cliente, { foreignKey: "cliente_id" });

User.hasMany(Pago, { foreignKey: "usuario_id" });
Pago.belongsTo(User, { foreignKey: "usuario_id" });

Negocio.hasMany(Pago, { foreignKey: "negocio_id" });
Pago.belongsTo(Negocio, { foreignKey: "negocio_id" });

export default Pago;