import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import Button from "./ui/Button";
import styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
  
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Logo */}
        <div className={styles.logo}>
          Nueva
        </div>

        {/* Menu */}
        <div className={styles.menu}>
          <NavLink to="/home" className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }>
            Home
          </NavLink>

          <NavLink to="/routes" className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }>
            Rutas
          </NavLink>

          <NavLink to="/my-routes" className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }>
            Mis rutas
          </NavLink>

          <NavLink to="/profile" className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }>
            Perfil
          </NavLink>

          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? `${styles.link} ${styles.admin} ${styles.active}`
                  : `${styles.link} ${styles.admin}`
              }
            >
              🔧 Admin
            </NavLink>
          )}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </div>
      </nav>
    </header>
  );
}
