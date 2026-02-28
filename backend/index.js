import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import sequelize from "./src/config/db.js";
import bcrypt from "bcrypt";
import User from "./src/models/User.js";

const PORT = process.env.PORT || 3001;

// 👑 Crear SuperAdmin automáticamente
async function createSuperAdmin() {
  try {
    const existingSuperAdmin = await User.findOne({
      where: { rol: "superadmin" },
    });

    if (!existingSuperAdmin) {
      const hashedPassword = await bcrypt.hash(
        process.env.SUPERADMIN_PASSWORD,
        10
      );

      await User.create({
        nombre: process.env.SUPERADMIN_NAME,
        username: process.env.SUPERADMIN_USERNAME,
        password: hashedPassword,
        rol: "superadmin",
        negocio_id: null,
      });

      console.log("👑 SuperAdmin creado correctamente");
    } else {
      console.log("👑 SuperAdmin ya existe");
    }
  } catch (error) {
    console.error("❌ Error creando SuperAdmin:", error);
  }
}

(async () => {
  try {
    // 🔗 Probar conexión a la DB
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos exitosa");

    // 🔄 Sincronizar modelos
    await sequelize.sync({ alter: true });
    console.log("📦 Modelos sincronizados con la base de datos");

    // 👑 Crear SuperAdmin si no existe
    await createSuperAdmin();

    // 🚀 Levantar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Backend corriendo en puerto ${PORT}`);
    });

  } catch (error) {
    console.error("❌ No se pudo iniciar el servidor:", error);
  }
})();