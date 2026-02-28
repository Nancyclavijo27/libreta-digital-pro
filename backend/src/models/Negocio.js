import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Negocio = sequelize.define("Negocio", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true, // crea createdAt y updatedAt
});

export default Negocio;