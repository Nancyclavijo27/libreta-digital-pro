import { useNavigate } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";

const Productos = () => {
  const navigate = useNavigate();
  const { productos, loading } = useProductos();

  return (
    <div>
      {/* 🔙 Volver */}
      <button onClick={() => navigate("/home")}>
        ← Volver
      </button>

      <h2>Productos</h2>

      {/* ➕ Crear */}
      <button onClick={() => navigate("/crear-producto")}>
        + Crear Producto
      </button>

      {/* ⏳ Cargando */}
      {loading && <p>Cargando productos...</p>}

      {/* 📦 Lista */}
      {!loading && productos.length === 0 && (
        <p>No hay productos creados</p>
      )}

      {!loading && productos.length > 0 && (
        <ul>
          {productos.map((p) => (
            <li key={p.id}>
              <strong>{p.nombre}</strong> | {p.unidad} | ${p.precio_base} | Stock: {p.stock}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Productos;