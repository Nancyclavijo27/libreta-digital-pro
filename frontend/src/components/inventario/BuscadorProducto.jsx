import styles from "./BuscadorProducto.module.css";

const BuscadorProducto = ({ busqueda, setBusqueda }) => {
  return (
    <input
      className={styles.input}
      placeholder="🔍 Buscar producto..."
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
    />
  );
};

export default BuscadorProducto;