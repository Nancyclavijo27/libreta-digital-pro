// routes/dashboardRoutes.js

import { Router } from "express";
import { getDashboardDueno } from "../controllers/dashboardController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { injectNegocio } from "../middlewares/injectNegocio.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = Router();

router.get(
  "/dueno",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno"),
  getDashboardDueno
);

export default router;