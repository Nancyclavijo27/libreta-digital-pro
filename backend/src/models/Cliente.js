// models/Cliente.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Negocio from "./Negocio.js";

const Cliente = sequelize.define("Cliente", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nombre: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },

  telefono: {
    type: DataTypes.STRING(30),
  },

  direccion: {
    type: DataTypes.STRING(200),
  },

  saldo_deuda: {
    type: DataTypes.DECIMAL(12,2),
    defaultValue: 0,
  },

  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  negocio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Negocios",
      key: "id",
    },
  },

}, {
  timestamps: true,
});

Negocio.hasMany(Cliente, { foreignKey: "negocio_id" });
Cliente.belongsTo(Negocio, { foreignKey: "negocio_id" });

export default Cliente;