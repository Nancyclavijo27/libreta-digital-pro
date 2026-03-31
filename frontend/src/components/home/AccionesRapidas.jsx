import { useNavigate } from "react-router-dom";

const AccionesRapidas = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/ventas")}>
        Registrar Venta
      </button>

      <button onClick={() => navigate("/entrada")}>
        Registrar Entrada
      </button>

      <button onClick={() => navigate("/deudas")}>
        Ver Deudas
      </button>

      <button onClick={() => navigate("/inventario")}>
        Inventario
      </button>

      <button onClick={() => navigate("/crear-producto")}>
          Crear Producto
      </button>
      <button onClick={() => navigate("/productos")}>
          Productos
      </button>
      <button onClick={() => navigate("/ventas-historial")}>
        Ver Ventas
      </button>
    </div>
  );
};

export default AccionesRapidas;