import styles from "./BotonConfirmarVenta.module.css";

const BotonConfirmarVenta = ({ onConfirm, loading }) => {
  return (
    <button
      className={styles.button}
      onClick={onConfirm}
      disabled={loading}
    >
      {loading ? "Guardando..." : "Confirmar Venta"}
    </button>
  );
};

export default BotonConfirmarVenta;