// index.js
import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import sequelize from "./src/config/db.js";

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    // 🔗 Probar conexión a la DB
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos exitosa");

    // 🔄 Sincronizar modelos (opcional)
    await sequelize.sync({ alter: true });
    console.log("📦 Modelos sincronizados con la base de datos");

    // 🚀 Levantar servidor Express
    app.listen(PORT, () => {
      console.log(`🚀 Backend corriendo en puerto ${PORT}`);
    });
    
  } catch (error) {
    console.error("❌ No se pudo iniciar el servidor:", error);
  }
})();