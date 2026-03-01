import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Negocio from "./Negocio.js";

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  negocio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Negocio,
      key: "id",
    },
    onDelete: "CASCADE",
  },

  nombre: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },

  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  unidad: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: "Unidad configurable: unidad, caja, bulto, paquete, kilo, litro, etc.",
  },

  permite_decimal: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  precio_base: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },

  stock: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0,
  },

  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

// 🔗 Relación: un negocio tiene muchos productos
Negocio.hasMany(Product, { foreignKey: "negocio_id" });
Product.belongsTo(Negocio, { foreignKey: "negocio_id" });

export default Product;