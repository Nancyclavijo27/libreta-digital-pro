import EntradaInventario from "../models/EntradaInventario.js";
import Product from "../models/Product.js";

/* =========================
   CREAR ENTRADA
========================= */
export const createEntrada = async (req, res) => {
  try {
    const { producto_id, cantidad, costo_unitario, descripcion } = req.body;

    if (!producto_id || !cantidad) {
      return res.status(400).json({
        message: "producto_id y cantidad son obligatorios",
      });
    }

    const producto = await Product.findOne({
      where: {
        id: producto_id,
        negocio_id: req.negocio_id,
        activo: true,
      },
    });

    if (!producto) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    // 🔥 Crear entrada
    const entrada = await EntradaInventario.create({
      producto_id,
      cantidad,
      costo_unitario: costo_unitario || null,
      descripcion: descripcion || null,
      usuario_id: req.user.id,
      negocio_id: req.negocio_id,
    });

    // 🔥 Actualizar stock (permite negativo en sistema)
    producto.stock = parseFloat(producto.stock) + parseFloat(cantidad);
    await producto.save();

    return res.status(201).json({
      message: "Entrada registrada correctamente",
      entrada,
      nuevo_stock: producto.stock,
    });

  } catch (error) {
    console.error("Error creando entrada:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};


/* =========================
   LISTAR ENTRADAS
========================= */
export const getEntradas = async (req, res) => {
  try {
    const entradas = await EntradaInventario.findAll({
      where: { negocio_id: req.negocio_id },
      order: [["createdAt", "DESC"]],
    });

    res.json(entradas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};