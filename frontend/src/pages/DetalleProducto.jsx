import { useNavigate } from "react-router-dom";
import { useProductoDetalle } from "../hooks/useProductoDetalle";

const DetalleProducto = () => {
  const navigate = useNavigate();
  const { producto, loading } = useProductoDetalle();

  if (loading) return <p>Cargando...</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div style={{ padding: "20px" }}>
      {/* 🔙 volver */}
      <button onClick={() => navigate("/inventario")}>
        ← Volver
      </button>

      <h2>Detalle del Producto</h2>

      {/* 📦 INFO */}
      <div style={{ marginBottom: "20px" }}>
        <p><strong>Nombre:</strong> {producto.nombre}</p>
        <p><strong>Unidad:</strong> {producto.unidad}</p>
        <p><strong>Precio base:</strong> ${producto.precio_base}</p>
        <p><strong>Stock actual:</strong> {producto.stock}</p>
      </div>

      {/* ➕ ACCIONES */}
      <button
        onClick={() => navigate("/entrada")}
        style={{ marginBottom: "20px" }}
      >
        + Registrar Entrada
      </button>

      {/* 🧾 FUTURO */}
      <h3>Historial de movimientos</h3>
      <p>Aquí luego verás entradas y salidas 🔥</p>
    </div>
  );
};

export default DetalleProducto;