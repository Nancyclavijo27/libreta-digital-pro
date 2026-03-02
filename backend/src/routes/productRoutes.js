import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deactivateProduct
} from "../controllers/productController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { injectNegocio } from "../middlewares/injectNegocio.js";

const router = Router();

/* =========================
   CRUD PRODUCTOS
========================= */

// Crear producto (solo dueño)
router.post(
  "/",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno"),
  createProduct
);

// Listar productos (dueño y empleado)
router.get(
  "/",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno", "empleado"),
  getProducts
);

// Obtener uno
router.get(
  "/:id",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno", "empleado"),
  getProductById
);

// Actualizar producto (solo dueño)
router.put(
  "/:id",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno"),
  updateProduct
);

// Desactivar producto (NO eliminar)
router.patch(
  "/:id/deactivate",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno"),
  deactivateProduct
);

export default router;