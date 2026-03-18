import Negocio from "../models/Negocio.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

/* =====================================
   DASHBOARD SUPER ADMIN
===================================== */
export const getDashboardSuperAdmin = async (req, res) => {
  try {

    const totalNegocios = await Negocio.count();
    const negociosActivos = await Negocio.count({ where: { estado: true } });
    const negociosInactivos = await Negocio.count({ where: { estado: false } });

    const totalUsuarios = await User.count();
    const totalDuenos = await User.count({ where: { rol: "dueno" } });
    const totalEmpleados = await User.count({ where: { rol: "empleado" } });

    res.json({
      total_negocios: totalNegocios,
      negocios_activos: negociosActivos,
      negocios_inactivos: negociosInactivos,
      total_usuarios: totalUsuarios,
      total_duenos: totalDuenos,
      total_empleados: totalEmpleados
    });

  } catch (error) {
    console.error("Error dashboard superadmin:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


/* =====================================
   VER NEGOCIOS
===================================== */
export const getNegocios = async (req, res) => {
  try {

    const negocios = await Negocio.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(negocios);

  } catch (error) {
    console.error("Error getNegocios:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


/* =====================================
   CREAR NEGOCIO
===================================== */
export const createNegocio = async (req, res) => {
  try {

    const { nombre, direccion } = req.body;

    if (!nombre) {
      return res.status(400).json({
        message: "Nombre es obligatorio"
      });
    }

    const negocio = await Negocio.create({
      nombre,
      direccion,
      estado: true
    });

    res.status(201).json(negocio);

  } catch (error) {
    console.error("Error createNegocio:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


/* =====================================
   ACTIVAR / DESACTIVAR NEGOCIO
===================================== */
export const toggleNegocio = async (req, res) => {
  try {

    const negocio = await Negocio.findByPk(req.params.id);

    if (!negocio) {
      return res.status(404).json({
        message: "Negocio no encontrado"
      });
    }

    negocio.estado = !negocio.estado;
    await negocio.save();

    res.json({
      message: "Estado negocio actualizado",
      estado: negocio.estado
    });

  } catch (error) {
    console.error("Error toggleNegocio:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


/* =====================================
   VER USUARIOS DE UN NEGOCIO
===================================== */
export const getUsuariosByNegocio = async (req, res) => {
  try {

    const usuarios = await User.findAll({
      where: { negocio_id: req.params.id },
      attributes: { exclude: ["password"] }
    });

    res.json(usuarios);

  } catch (error) {
    console.error("Error getUsuariosByNegocio:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


/* =====================================
   BLOQUEAR / DESBLOQUEAR USUARIO
===================================== */
export const toggleUsuario = async (req, res) => {
  try {

    const usuario = await User.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        message: "Usuario no encontrado"
      });
    }

    usuario.activo = !usuario.activo;
    await usuario.save();

    res.json({
      message: "Estado usuario actualizado",
      activo: usuario.activo
    });

  } catch (error) {
    console.error("Error toggleUsuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


/* =====================================
   CREAR USUARIO (DUENO / EMPLEADO)
===================================== */
export const createUsuario = async (req, res) => {
  try {

    const { nombre, username, password, rol, negocio_id } = req.body;

    if (!nombre || !username || !password || !rol) {
      return res.status(400).json({
        message: "Datos incompletos"
      });
    }

    const existingUser = await User.findOne({
      where: { username }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username ya existe"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
  nombre,
  username: username.toLowerCase(),
  password: hashedPassword,
  rol,
  negocio_id: negocio_id || null, // por si es superadmin o dueño sin negocio
  activo: true
});
    res.status(201).json({
      message: "Usuario creado",
      user
    });

  } catch (error) {
    console.error("Error createUsuario:", error);
    res.status(500).json({
      message: "Error interno del servidor"
    });
  }
};