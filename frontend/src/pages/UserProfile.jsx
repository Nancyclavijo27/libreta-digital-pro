import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import styles from "./UserProfile.module.css";

export default function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

 return (
    <main className={styles.page}>
      <div className={styles.card}>

        <div className={styles.avatar}>👤</div>

        {user ? (
          <>
            <div className={styles.nombre}>
              {user.nombre}
            </div>

            <div className={styles.username}>
              @{user.username}
            </div>

            <div className={styles.rol}>
              {user.rol}
            </div>
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