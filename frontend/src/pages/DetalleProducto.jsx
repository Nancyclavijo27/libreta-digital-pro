import { useNavigate } from "react-router-dom";
import { useProductoDetalle } from "../hooks/useProductoDetalle";
import styles from "./DetalleProducto.module.css";

const DetalleProducto = () => {
  const navigate = useNavigate();
  const { producto, loading } = useProductoDetalle();

  if (loading) return <p>Cargando...</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  const getEmoji = (nombre) => {
    const n = nombre.toLowerCase();
    if (n.includes("zanahoria")) return "🥕";
    if (n.includes("papa")) return "🥔";
    if (n.includes("piña")) return "🍍";
    if (n.includes("cebolla")) return "🧅";
    return "📦";
  };

  return (
    <div className={styles.container}>

      <button
        onClick={() => navigate("/inventario")}
        className={styles.btnBack}
      >
        ← Volver
      </button>

      {/* 🔥 HEADER EN DOS COLUMNAS */}
      <div className={styles.header}>

  {/* IZQUIERDA + CENTRO */}
  <div className={styles.left}>
    <div className={styles.image}>
      {getEmoji(producto.nombre)}
    </div>

    <div className={styles.info}>
      <div className={styles.nombre}>
        {producto.nombre}
      </div>

      <div className={styles.unidad}>
        {producto.unidad}
      </div>
    </div>
  </div>

  {/* DERECHA */}
  <div className={styles.right}>
    <div className={styles.precio}>
      ${producto.precio_base}
    </div>
  </div>

</div>

      {/* 📦 STOCK */}
      <div className={styles.stockBox}>
        <p>Stock Actual</p>
        <p className={styles.stock}>
          {producto.stock}
        </p>
      </div>

      {/* 🔘 BOTÓN */}
      <button
        className={styles.button}
        onClick={() => navigate("/entrada")}
      >
        Ajustar Stock
      </button>

    </div>
  );
};

export default DetalleProducto;