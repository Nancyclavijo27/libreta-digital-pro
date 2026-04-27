import { useNavigate } from "react-router-dom";
import styles from "./ItemProducto.module.css";

const ItemProducto = ({ producto }) => {
  const navigate = useNavigate();

  const getEmoji = (nombre) => {
    const n = nombre.toLowerCase();
    if (n.includes("zanahoria")) return "🥕";
    if (n.includes("papa")) return "🥔";
    if (n.includes("piña")) return "🍍";
    if (n.includes("cebolla")) return "🧅";
    return "📦";
  };

  return (
    <div
      className={styles.item}
      onClick={() => navigate(`/producto/${producto.id}`)}
    >
      <div className={styles.left}>
        <span className={styles.icon}>
          {getEmoji(producto.nombre)}
        </span>

        <div className={styles.text}>
          <span className={styles.nombre}>
            {producto.nombre}
          </span>

          {/* 🔥 AHORA ES HORIZONTAL */}
          <span className={styles.stock}>
            {producto.stock} {producto.unidad}
          </span>
        </div>
      </div>

      <div className={styles.right}>
        <span className={styles.precio}>
          ${producto.precio_base}
        </span>

        <span className={styles.arrow}>›</span>
      </div>
    </div>
  );
};

export default ItemProducto;