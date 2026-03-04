import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/superadmin/dashboard");
        setData(response.data);
      } catch (error) {
        console.error("Error cargando dashboard:", error);
      }
    };

    fetchDashboard();
  }, []);

  if (!data) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Dashboard SuperAdmin</h1>
      <p>Total negocios: {data.totalNegocios}</p>
      <p>Negocios activos: {data.negociosActivos}</p>
      <p>Negocios inactivos: {data.negociosInactivos}</p>
      <p>Total usuarios: {data.totalUsuarios}</p>
    </div>
  );
}
