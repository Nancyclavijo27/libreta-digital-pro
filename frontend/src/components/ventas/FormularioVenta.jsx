import styles from "./FormularioVenta.module.css";

const ResumenVenta = ({ total }) => {
  return (
    <div className={styles.card}>
      <p>Total</p>
      <h2>${Number(total || 0).toLocaleString()}</h2>
    </div>
  );
};

export default ResumenVenta;