import { Router } from "express";
import { createVenta } from "../controllers/ventaController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { injectNegocio } from "../middlewares/injectNegocio.js";

const router = Router();

/* =========================
   VENTAS
========================= */

// Crear venta (dueño y empleado pueden vender)
router.post(
  "/",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno", "empleado"),
  createVenta
);

export default router;