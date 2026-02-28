import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Negocio from "./Negocio.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  rol: {
    type: DataTypes.ENUM("superadmin", "dueno", "empleado"),
    allowNull: false,
    defaultValue: "empleado",
  },

  negocio_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Negocio,
      key: "id",
    },
    allowNull: true,
  },

  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

}, {
  timestamps: true,
});

Negocio.hasMany(User, { foreignKey: "negocio_id" });
User.belongsTo(Negocio, { foreignKey: "negocio_id" });

export default User;