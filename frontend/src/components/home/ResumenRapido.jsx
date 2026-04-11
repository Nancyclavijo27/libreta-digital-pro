import styles from "./ResumenRapido.module.css";

const ResumenRapido = ({
  totalPendiente,
  clientesDeuda,
  ventasHoy,
  ventasCantidad
}) => {
  return (
    <div className={styles.grid}>

      <div className={styles.card}>
        <span className={styles.icon}>💰</span>
        <p>Me deben</p>
        <h3 className={styles.red}>
          ${Number(totalPendiente || 0).toLocaleString()}
        </h3>
      </div>

      <div className={styles.card}>
        <span className={styles.icon}>👥</span>
        <p>Clientes debiendo</p>
        <h3>{clientesDeuda || 0}</h3>
      </div>

      <div className={styles.card}>
        <span className={styles.icon}>💵</span>
        <p>Vendido hoy</p>
        <h3 className={styles.green}>
          ${Number(ventasHoy || 0).toLocaleString()}
        </h3>
      </div>

      <div className={styles.card}>
        <span className={styles.icon}>🧾</span>
        <p>Ventas hoy</p>
        <h3>{ventasCantidad || 0}</h3>
      </div>

    </div>
  );
};

export default ResumenRapido;