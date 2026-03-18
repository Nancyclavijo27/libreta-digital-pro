import api from "./axiosInstance";

// dashboard
export const getDashboard = async () => {
  const res = await api.get("/superadmin/dashboard");
  return res.data;
};

// negocios
export const getNegocios = async () => {
  const res = await api.get("/superadmin/negocios");
  return res.data;
};

export const createNegocio = async (data) => {
  const res = await api.post("/superadmin/negocios", data);
  return res.data;
};

// usuarios
export const createUsuario = async (data) => {
  const res = await api.post("/superadmin/usuarios", data);
  return res.data;
};

export const toggleUsuario = async (id) => {
  const res = await api.patch(`/superadmin/usuarios/${id}/toggle`);
  return res.data;
};