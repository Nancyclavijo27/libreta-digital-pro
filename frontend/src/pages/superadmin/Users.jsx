import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { toggleUsuario } from "../../api/superAdminApi";
import styles from "./Users.module.css";

export default function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await api.get("/superadmin/negocios/1/usuarios");
      setUsers(res.data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleUsuario(id);
      await loadUsers(); // refresca
    } catch (error) {
      console.error("Error cambiando estado:", error);
    }
  };

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>Usuarios</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Username</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.username}</td>
              <td>{u.rol}</td>

              <td className={u.activo ? styles.activo : styles.inactivo}>
                {u.activo ? "Activo" : "Bloqueado"}
              </td>

              <td>
                <button
                  onClick={() => handleToggle(u.id)}
                  className={u.activo ? styles.btnDesactivar : styles.btnActivar}
                >
                  {u.activo ? "Bloquear" : "Activar"}
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}