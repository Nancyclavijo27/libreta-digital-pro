import styles from "./UltimaVenta.module.css";

const UltimaVenta = ({ venta }) => {

  if (!venta) {
    return (
      <div className={styles.card}>
        <p className={styles.title}>Actividad</p>
        <p>No hay ventas aún</p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <p className={styles.title}>Última venta</p>

      <div className={styles.content}>
        <span>{venta.producto}</span>
        <strong>
          ${Number(venta.total).toLocaleString()}
        </strong>
      </div>
    </div>
  );
};

export default UltimaVenta;