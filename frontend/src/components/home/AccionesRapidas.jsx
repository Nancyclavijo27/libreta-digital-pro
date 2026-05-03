import { useNavigate } from "react-router-dom";
import styles from "./AccionesRapidas.module.css";

const AccionesRapidas = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.grid}>

      <button
        className={`${styles.card} ${styles.orange}`}
        onClick={() => navigate("/ventas")}
      >
        📦
        <span>Registrar Venta</span>
      </button>

      <button
        className={`${styles.card} ${styles.blue}`}
        onClick={() => navigate("/entrada")}
      >
        🧾
        <span>Registrar Entrada</span>
      </button>

      <button
        className={`${styles.card} ${styles.red}`}
        onClick={() => navigate("/deudas")}
      >
        🚚
        <span>Deudas</span>
      </button>

      <button
        className={`${styles.card} ${styles.green}`}
        onClick={() => navigate("/inventario")}
      >
        🏪
        <span>Inventario</span>
      </button>

    </div>
  );
};

export default AccionesRapidas;