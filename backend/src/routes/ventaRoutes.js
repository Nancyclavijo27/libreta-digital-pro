import { Router } from "express";
import { createVenta } from "../controllers/ventaController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { injectNegocio } from "../middleware/injectNegocio.js";

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