import { Router } from "express";
import {
  createEntrada,
  getEntradas
} from "../controllers/entradaInventarioController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { injectNegocio } from "../middlewares/injectNegocio.js";

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