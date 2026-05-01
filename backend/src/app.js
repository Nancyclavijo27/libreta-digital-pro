import express from "express";
import cors from "cors";

// 📦 Registro GLOBAL de modelos
import "./models/User.js";
import "./models/Negocio.js";
import "./models/Product.js";
import "./models/Cliente.js";
import "./models/EntradaInventario.js";
import "./models/Venta.js";
import "./models/DetalleVenta.js";
import "./models/Pago.js";

// 🛣️ Rutas
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import entradaInventarioRoutes from "./routes/entradaInventarioRoutes.js";
import ventaRoutes from "./routes/ventaRoutes.js";
import pagoRoutes from "./routes/pagoRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import superAdminRoutes from "./routes/superAdminRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

/* ======================
   ORIGENES PERMITIDOS
====================== */
const allowedOrigins = [
  "http://localhost:3000",
  "https://libreta-digital-pro.vercel.app"
];

/* ======================
   CORS CONFIG (PRODUCCIÓN)
====================== */
app.use(
  cors({
    origin: function (origin, callback) {
      // Permite requests sin origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("❌ Bloqueado por CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// IMPORTANTE para preflight requests
app.options("*", cors());

/* ======================
   MIDDLEWARE
====================== */
app.use(express.json());

/* ======================
   RUTAS
====================== */
app.use("/api/auth", authRoutes);
app.use("/api/productos", productRoutes);
app.use("/api/entradas", entradaInventarioRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/pagos", pagoRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;