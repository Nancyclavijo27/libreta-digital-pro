import { useInventario } from "../hooks/useInventario";
import { useNavigate } from "react-router-dom";

import BuscadorProducto from "../components/inventario/BuscadorProducto";
import ListaInventario from "../components/inventario/ListaInventario";

const Inventario = () => {
  const navigate = useNavigate();

  const {
    productos,
    busqueda,
    setBusqueda,
    loading,
  } = useInventario();

  if (loading) return <p>Cargando...</p>;

  return (
    <div style={{ padding: "20px" }}>

      {/* 🔙 volver */}
      <button onClick={() => navigate("/home")}>
        ← Volver
      </button>

      <h2>📦 Inventario</h2>

      {/* 🔹 ACCIONES PRINCIPALES */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => navigate("/crear-producto")}>
          + Crear Producto
        </button>

        <button onClick={() => navigate("/entrada")}>
          + Registrar Entrada
        </button>
      </div>

      {/* 🔍 buscador */}
      <BuscadorProducto
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />

      {/* 📦 lista */}
      <ListaInventario productos={productos} />

    </div>
  );
};

export default Inventario;