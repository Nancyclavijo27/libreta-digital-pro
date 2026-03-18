import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminDashboard.module.css";
import { getDashboard } from "../../api/superAdminApi";

export default function AdminDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total_negocios: 0,
    total_usuarios: 0,
    negocios_activos: 0,
    negocios_inactivos: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadDashboard = async () => {
      try {

        const data = await getDashboard();
        setStats(data);

      } catch (error) {
        console.error("Error cargando dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();

  }, []);

  if (loading) {
    return <p>Cargando dashboard...</p>;
  }

  return (
    <div className={styles.container}>

      <h1>Super Admin Dashboard</h1>

      <div className={styles.stats}>

        <div className={styles.card}>
          <h3>Total negocios</h3>
          <p>{stats.total_negocios}</p>
        </div>

        <div className={styles.card}>
          <h3>Total usuarios</h3>
          <p>{stats.total_usuarios}</p>
        </div>

        <div className={styles.card}>
          <h3>Negocios activos</h3>
          <p>{stats.negocios_activos}</p>
        </div>

        <div className={styles.card}>
          <h3>Negocios suspendidos</h3>
          <p>{stats.negocios_inactivos}</p>
        </div>

      </div>

      <div className={styles.actions}>

        <button onClick={() => navigate("/superadmin/create-business")}>
          Crear negocio
        </button>

        <button onClick={() => navigate("/superadmin/businesses")}>
          Ver negocios
        </button>

        <button onClick={() => navigate("/superadmin/create-user")}>
          Crear usuario
        </button>

        <button onClick={() => navigate("/superadmin/users")}>
          Ver usuarios
        </button>

      </div>

      <div className={styles.alerts}>
        <h2>Alertas</h2>

        <ul>
          <li>Negocios inactivos: {stats.negocios_inactivos}</li>
        </ul>

      </div>

    </div>
  );
}