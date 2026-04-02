import { useEntradas } from "../hooks/useEntradas";
import { useNavigate } from "react-router-dom";

const RegistrarEntrada = () => {
  const navigate = useNavigate();

  const {
    productos,
    productoSeleccionado,
    cantidad,
    costo,
    loading,
    setCantidad,
    setCosto,
    seleccionarProducto,
    crearEntrada,
  } = useEntradas();

  const handleGuardar = async () => {
    if (!productoSeleccionado) {
      alert("Seleccione un producto");
      return;
    }

    const ok = await crearEntrada();

    if (ok) {
      navigate("/inventario");
    }
  };

  return (
    <div>
      <button onClick={() => navigate("/inventario")}>
        ← Volver
      </button>

      <h2>Registrar Entrada</h2>

      <select
        value={productoSeleccionado?.id || ""}
        onChange={(e) => {
          const producto = productos.find(
            (p) => p.id === Number(e.target.value)
          );
          seleccionarProducto(producto);
        }}
      >
        <option value="">Seleccione producto</option>

        {productos.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nombre}
          </option>
        ))}
      </select>

      {productoSeleccionado && (
        <p>
          {productoSeleccionado.nombre} - Stock: {productoSeleccionado.stock}
        </p>
      )}

      <input
        type="number"
        value={cantidad}
        onChange={(e) => setCantidad(Number(e.target.value))}
      />

      <input
        type="number"
        value={costo}
        onChange={(e) => setCosto(Number(e.target.value))}
      />

      <button onClick={handleGuardar} disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </div>
  );
};

export default RegistrarEntrada;