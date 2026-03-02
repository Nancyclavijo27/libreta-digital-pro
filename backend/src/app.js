import express from "express";
import cors from "cors";

// 📦 Registro GLOBAL de modelos
import "./models/User.js";
import "./models/Negocio.js";
import "./models/Product.js";


// 🛣️ Rutas
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
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
app.use("/api/auth", authRoutes);
app.use("/api/productos", productRoutes);
app.use("/api/admin", adminRoutes);

export default app;