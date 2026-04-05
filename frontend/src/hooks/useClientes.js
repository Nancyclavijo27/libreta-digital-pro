import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

export const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 obtener clientes
  const fetchClientes = async () => {
    try {
      const res = await api.get("/clientes");
      setClientes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  // 🔹 crear cliente
  const crearCliente = async (data) => {
    setLoading(true);
    try {
      await api.post("/clientes", data);
      await fetchClientes();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    clientes,
    loading,
    crearCliente,
  };
};