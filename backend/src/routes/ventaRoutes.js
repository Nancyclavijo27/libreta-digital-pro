import { Router } from "express";
import { createVenta, getVentas } from "../controllers/ventaController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { injectNegocio } from "../middleware/injectNegocio.js";

const router = Router();

/* =========================
   CREAR VENTA
========================= */
router.post(
  "/",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno", "empleado"),
  createVenta
);

/* =========================
   LISTAR VENTAS
========================= */
router.get(
  "/",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno", "empleado"),
  getVentas
);

export default router;