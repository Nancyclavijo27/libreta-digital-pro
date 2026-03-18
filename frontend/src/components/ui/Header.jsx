import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className={styles.header}>

      <div className={styles.info}>
        <h3 className={styles.business}>
          {user?.businessName || "Mi negocio"}
        </h3>

        <span className={styles.user}>
          Hola {user?.name}
        </span>
      </div>

      <button
        className={styles.logout}
        onClick={handleLogout}
      >
        Salir
      </button>

    </div>
  );
}