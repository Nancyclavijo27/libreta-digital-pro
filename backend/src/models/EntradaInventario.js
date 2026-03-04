// models/EntradaInventario.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Producto from "./Product.js";
import User from "./User.js";
import Negocio from "./Negocio.js";

const EntradaInventario = sequelize.define("EntradaInventario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  cantidad: {
    type: DataTypes.DECIMAL(12,2),
    allowNull: false,
  },

  costo_unitario: {
    type: DataTypes.DECIMAL(12,2),
  },

  descripcion: {
    type: DataTypes.TEXT,
  },

  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  negocio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

}, {
  timestamps: true,
});

Producto.hasMany(EntradaInventario, { foreignKey: "producto_id" });
EntradaInventario.belongsTo(Producto, { foreignKey: "producto_id" });

User.hasMany(EntradaInventario, { foreignKey: "usuario_id" });
EntradaInventario.belongsTo(User, { foreignKey: "usuario_id" });

Negocio.hasMany(EntradaInventario, { foreignKey: "negocio_id" });
EntradaInventario.belongsTo(Negocio, { foreignKey: "negocio_id" });

export default EntradaInventario;