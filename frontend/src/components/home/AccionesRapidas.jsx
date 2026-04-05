import { useNavigate } from "react-router-dom";

const AccionesRapidas = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/ventas")}>
        Registrar Venta
      </button>

       <button onClick={() => navigate("/deudas")}>
        Ver Deudas
      </button>

      <button onClick={() => navigate("/inventario")}>
        Inventario
      </button>
      
      <button onClick={() => navigate("/clientes")}>
         Clientes
      </button>
    </div>
  );
};

export default AccionesRapidas;