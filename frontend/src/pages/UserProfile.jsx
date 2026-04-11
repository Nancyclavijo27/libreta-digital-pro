import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import styles from "./UserProfile.module.css";

export default function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h2>Perfil</h2>

        {user ? (
          <>
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>Usuario:</strong> {user.username}</p>
          </>
        ) : (
          <p>No hay información</p>
        )}

        <button
          className={styles.logout}
          onClick={() => {
            logout();
            navigate("/login", { replace: true });
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </main>
  );
}