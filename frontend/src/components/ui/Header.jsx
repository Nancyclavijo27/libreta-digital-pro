import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../utils/auth";
import styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const getTitle = () => {
    switch (location.pathname) {
      case "/home":
        return "Inicio";
      case "/ventas":
        return "Ventas";
      case "/deudas":
        return "Deudas";
      case "/inventario":
        return "Inventario";
      case "/clientes":
        return "Clientes";
      case "/profile":
        return "Perfil";
      default:
        return "";
    }
  };

  return (
    <div className={styles.header}>

      <div className={styles.info}>
        <h3 className={styles.business}>
          {user?.negocio?.nombre || "Mi negocio"}
        </h3>

        <span className={styles.user}>
          Hola {user?.nombre || ""}
        </span>

        {/* 👇 nuevo título */}
        <h2 className={styles.pageTitle}>
          {getTitle()}
        </h2>
      </div>

      <button className={styles.logout} onClick={handleLogout}>
        Salir
      </button>

    </div>
  );
}