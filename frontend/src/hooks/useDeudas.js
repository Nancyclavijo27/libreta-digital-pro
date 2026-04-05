import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

export const useDeudas = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeudas = async () => {
      try {
        const res = await api.get("/clientes/deudas");
        setClientes(res.data);
      } catch (error) {
        console.error("Error cargando deudas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeudas();
  }, []);

  return { clientes, loading };
};