import { Router } from "express";
import {
  getDashboardSuperAdmin,
  getNegocios,
  createNegocio,
  toggleNegocio,
  getUsuariosByNegocio,
  toggleUsuario
} from "../controllers/superAdminController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = Router();

router.use(authMiddleware);
router.use(authorizeRoles("superadmin"));

router.get("/dashboard", getDashboardSuperAdmin);

router.get("/negocios", getNegocios);
router.post("/negocios", createNegocio);
router.patch("/negocios/:id/toggle", toggleNegocio);

router.get("/negocios/:id/usuarios", getUsuariosByNegocio);
router.patch("/usuarios/:id/toggle", toggleUsuario);

export default router;