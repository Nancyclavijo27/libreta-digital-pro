import { Router } from "express";
import { registrarPago } from "../controllers/pagoController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { injectNegocio } from "../middlewares/injectNegocio.js";

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