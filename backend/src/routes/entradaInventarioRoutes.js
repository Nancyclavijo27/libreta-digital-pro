import { Router } from "express";
import {
  createEntrada,
  getEntradas
} from "../controllers/entradaInventarioController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { injectNegocio } from "../middleware/injectNegocio.js";

const router = Router();

/* =========================
   ENTRADAS INVENTARIO
========================= */

// Crear entrada (solo dueño)
router.post(
  "/",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno"),
  createEntrada
);

// Listar entradas (solo dueño)
router.get(
  "/",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno"),
  getEntradas
);

export default router;