import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1️⃣ Validar datos
    if (!username || !password) {
      return res.status(400).json({
        message: "Username y password son obligatorios"
      });
    }

    // 2️⃣ Buscar usuario activo
    const user = await User.findOne({
      where: {
        username,
        estado: true
      }
    });

    if (!user) {
      return res.status(400).json({
        message: "Usuario no existe o está inactivo"
      });
    }

    // 3️⃣ Comparar contraseña
    const passwordValida = await bcrypt.compare(password, user.password);

    if (!passwordValida) {
      return res.status(400).json({
        message: "Contraseña incorrecta"
      });
    }

    // 4️⃣ Crear token
    const token = jwt.sign(
      {
        id: user.id,
        rol: user.rol,
        negocio_id: user.negocio_id
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 5️⃣ Respuesta
    return res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        rol: user.rol,
        negocio_id: user.negocio_id
      }
    });

  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
};