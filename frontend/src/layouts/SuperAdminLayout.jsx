import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "./SuperAdminLayout.module.css";

export default function SuperAdminLayout() {

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>

      <header className={styles.header}>

        <h2 className={styles.logo}>Libreta Digital Admin</h2>

        <nav className={styles.nav}>

          <NavLink to="/superadmin/dashboard">Dashboard</NavLink>

          <NavLink to="/superadmin/create-business">
            Crear negocio
          </NavLink>

          <NavLink to="/superadmin/businesses">
            Negocios
          </NavLink>

          <NavLink to="/superadmin/create-user">
            Crear usuario
          </NavLink>

          <NavLink to="/superadmin/users">
            Usuarios
          </NavLink>

        </nav>

        <button
          className={styles.logout}
          onClick={handleLogout}
        >
          Salir
        </button>

      </header>

      <main className={styles.content}>
        <Outlet />
      </main>

    </div>
  );
}