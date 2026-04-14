import styles from "./SelectorProducto.module.css";

const SelectorProducto = ({ productos = [], onSelect }) => {

  const handleChange = (e) => {
    const id = Number(e.target.value);

    if (!id) return;

    const producto = productos.find(p => p.id === id);

    if (producto && onSelect) {
      onSelect(producto);
    }

    // 🔥 resetear selección (UX tipo app)
    e.target.value = "";
  };

  return (
  <div className={styles.container}>

    <div className={styles.inputWrapper}>
      <span className={styles.icon}>➕</span>

      <select
        className={styles.select}
        onChange={handleChange}
        defaultValue=""
      >
        <option value="">Agregar producto...</option>

        {Array.isArray(productos) &&
          productos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} - ${p.precio_base}
            </option>
          ))}
      </select>
    </div>

  </div>
);
};

export default SelectorProducto;