import Product from "../models/Product.js";

/* =========================
   CREAR PRODUCTO
========================= */
export const createProduct = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      unidad,
      permite_decimal,
      precio_base,
      stock
    } = req.body;

    if (!nombre || !unidad || !precio_base) {
      return res.status(400).json({
        message: "Nombre, unidad y precio_base son obligatorios"
      });
    }

    const product = await Product.create({
      nombre,
      descripcion,
      unidad,
      permite_decimal: permite_decimal || false,
      precio_base,
      stock: stock || 0,
      negocio_id: req.negocio_id,
    });

    return res.status(201).json(product);

  } catch (error) {
    console.error("Error creando producto:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

/* =========================
   LISTAR PRODUCTOS
========================= */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        negocio_id: req.negocio_id,
        activo: true
      },
      order: [["created_at", "DESC"]],
    });

    return res.json(products);

  } catch (error) {
    console.error("Error listando productos:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

/* =========================
   OBTENER UNO
========================= */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
        negocio_id: req.negocio_id,
      }
    });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.json(product);

  } catch (error) {
    console.error("Error obteniendo producto:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

/* =========================
   ACTUALIZAR
========================= */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
        negocio_id: req.negocio_id,
      }
    });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await product.update(req.body);

    return res.json(product);

  } catch (error) {
    console.error("Error actualizando producto:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

/* =========================
   DESACTIVAR (NO DELETE)
========================= */
export const deactivateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
        negocio_id: req.negocio_id,
      }
    });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await product.update({ activo: false });

    return res.json({ message: "Producto desactivado correctamente" });

  } catch (error) {
    console.error("Error desactivando producto:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};