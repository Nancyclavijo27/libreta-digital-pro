import { Router } from "express";
import {
  createCliente,
  getClientesConDeuda,
  getClienteById,
  deactivateCliente
} from "../controllers/clienteController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { injectNegocio } from "../middlewares/injectNegocio.js";

const router = Router();

/* =========================
   CLIENTES
========================= */

// Crear cliente (solo dueño)
router.post(
  "/",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno"),
  createCliente
);

// Listar clientes con deuda
router.get(
  "/deudas",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno", "empleado"),
  getClientesConDeuda
);

// Detalle cliente
router.get(
  "/:id",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno", "empleado"),
  getClienteById
);

// Desactivar cliente
router.patch(
  "/:id/deactivate",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno"),
  deactivateCliente
);

export default router;