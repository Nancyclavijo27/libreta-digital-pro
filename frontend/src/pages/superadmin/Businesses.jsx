import { useEffect, useState } from "react";
import { getNegocios } from "../../api/superAdminApi";
import styles from "./Businesses.module.css";

export default function Businesses() {

  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {

    const loadBusinesses = async () => {

      try {
        const data = await getNegocios();
        setBusinesses(data);
      } catch (error) {
        console.error(error);
      }

    };

    loadBusinesses();

  }, []);

  return (

    <div className={styles.container}>

      <h1 className={styles.title}>Negocios</h1>

      <table className={styles.table}>

        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Estado</th>
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

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}