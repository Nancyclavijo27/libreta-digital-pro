import { NavLink } from "react-router-dom";
import styles from "./bottomNav.module.css";

export default function BottomNav() {
  return (
    <div className={styles.nav}>

      <NavLink
        to="/home"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        <div>🏠</div>
        <span>Inicio</span>
      </NavLink>

      <NavLink
        to="/ventas"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        <div>💰</div>
        <span>Ventas</span>
      </NavLink>

      <NavLink
        to="/deudas"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        <div>📄</div>
        <span>Deudas</span>
      </NavLink>

      <NavLink
        to="/inventario"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        <div>📦</div>
        <span>Inventario</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        <div>👤</div>
        <span>Perfil</span>
      </NavLink>

    </div>
  );
}