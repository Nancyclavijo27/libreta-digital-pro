// routes/dashboardRoutes.js

import { Router } from "express";
import { getDashboardDueno } from "../controllers/dashboardController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { injectNegocio } from "../middleware/injectNegocio.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = Router();

router.get(
  "/dueno",
  authMiddleware,
  injectNegocio,
  authorizeRoles("dueno"),
  getDashboardDueno
);

export default router;