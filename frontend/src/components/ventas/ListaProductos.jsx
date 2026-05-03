import styles from "./ListaProductos.module.css";

const getEmoji = (nombre) => {
  const n = nombre.toLowerCase();

  if (n.includes("papa")) return "🥔";
  if (n.includes("piña")) return "🍍";
  if (n.includes("zanahoria")) return "🥕";
  if (n.includes("remolacha")) return "🍠";
  if (n.includes("pera")) return "🍐";

  return "🛒";
};

const ListaProductos = ({ items = [], cambiarCantidad, eliminarProducto }) => {

  if (!Array.isArray(items) || items.length === 0) {
    return <p className={styles.vacio}>No hay productos agregados</p>;
  }

  return (
    <div className={styles.lista}>
      {items.map((item) => {
        const subtotal = item.cantidad * item.precio_unitario;

        return (
          <div key={item.producto_id} className={styles.card}>

            {/* INFO */}
            <div className={styles.info}>
              <p className={styles.nombre}>
                {getEmoji(item.nombre)} {item.nombre}
              </p>
              <p className={styles.precio}>
                ${item.precio_unitario.toLocaleString()}
              </p>
            </div>

            {/* CONTADOR */}
            <div className={styles.controles}>
  <input
    type="tel"
    value={item.cantidad}
    onChange={(e) =>
      cambiarCantidad(item.producto_id, Number(e.target.value))
    }
    className={styles.inputCantidad}
  />
</div>

            {/* TOTAL */}
            <div className={styles.total}>
              ${subtotal.toLocaleString()}
            </div>

            {/* ELIMINAR */}
            <button
              className={styles.eliminar}
              onClick={() => eliminarProducto(item.producto_id)}
            >
              ✕
            </button>

          </div>
        );
      })}
    </div>
  );
};

export default ListaProductos;