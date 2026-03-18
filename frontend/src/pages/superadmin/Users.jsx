import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import styles from "./Users.module.css";

export default function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    const loadUsers = async () => {

      try {
        const res = await api.get("/superadmin/negocios/1/usuarios");
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }

    };

    loadUsers();

  }, []);

  return (

    <div className={styles.container}>

      <h1 className={styles.title}>Usuarios</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Username</th>
            <th>Rol</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.username}</td>
              <td>{u.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>

  );
}