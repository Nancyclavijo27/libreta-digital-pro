import { Router } from "express";
import { registrarPago } from "../controllers/pagoController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { injectNegocio } from "../middleware/injectNegocio.js";

const router = Router();

// Registrar pago (solo dueño)
router.post(
  "/",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno", "empleado"),
  registrarPago
);

export default router;