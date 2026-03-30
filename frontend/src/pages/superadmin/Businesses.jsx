import { useEffect, useState } from "react";
import { getNegocios, toggleNegocio } from "../../api/superAdminApi";
import styles from "./Businesses.module.css";

export default function Businesses() {

  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    try {
      const data = await getNegocios();
      setBusinesses(data);
    } catch (error) {
      console.error("Error cargando negocios:", error);
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleNegocio(id);
      await loadBusinesses(); // refresca lista
    } catch (error) {
      console.error("Error cambiando estado:", error);
    }
  };

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>Negocios</h1>

      <table className={styles.table}>

        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>

          {businesses.map((b) => (

            <tr key={b.id}>
              <td>{b.nombre}</td>
              <td>{b.direccion}</td>

              <td className={b.estado ? styles.activo : styles.suspendido}>
                {b.estado ? "Activo" : "Suspendido"}
              </td>

              <td>
                <button
                  onClick={() => handleToggle(b.id)}
                  className={b.estado ? styles.btnDesactivar : styles.btnActivar}
                >
                  {b.estado ? "Desactivar" : "Activar"}
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}