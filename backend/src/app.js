import express from "express";
import cors from "cors";

// 📦 Registro GLOBAL de modelos
import "./models/User.js";

// 🛣️ Rutas
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

/* ======================
   Middlewares
====================== */
const allowedOrigins = [
  "http://localhost:3000",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/* ======================
   Rutas
====================== */
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/api", adminRoutes);

export default app;