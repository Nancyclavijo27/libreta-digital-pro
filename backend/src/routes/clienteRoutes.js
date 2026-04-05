import { Router } from "express";
import {
  createCliente,
  getClientes,
  getClientesConDeuda,
  getClienteById,
  deactivateCliente
} from "../controllers/clienteController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { injectNegocio } from "../middleware/injectNegocio.js";

const router = Router();

/* =========================
   CLIENTES
========================= */

// 🔹 Crear cliente (solo dueño)
router.post(
  "/",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno"),
  createCliente
);

// 🔹 Listar TODOS los clientes (🔥 CLAVE PARA VENTAS)
router.get(
  "/",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno", "empleado"),
  getClientes
);

// 🔹 Listar clientes con deuda
router.get(
  "/deudas",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno", "empleado"),
  getClientesConDeuda
);

// 🔹 Detalle cliente
router.get(
  "/:id",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno", "empleado"),
  getClienteById
);

// 🔹 Desactivar cliente
router.patch(
  "/:id/deactivate",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno"),
  deactivateCliente
);

export default router;