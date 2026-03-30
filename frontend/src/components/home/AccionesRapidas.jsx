import { useNavigate } from "react-router-dom";

const AccionesRapidas = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/venta")}>
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
    </div>
  );
};

export default AccionesRapidas;