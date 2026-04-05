import { useNavigate } from "react-router-dom";
import { useDeudas } from "../hooks/useDeudas";
import ListaDeudas from "../components/deudas/ListaDeudas";

const Deudas = () => {
  const navigate = useNavigate();
  const { clientes, loading } = useDeudas();

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <button onClick={() => navigate("/home")}>
        ← Volver
      </button>

      <h2>Deudas</h2>

      <ListaDeudas clientes={clientes} />
    </div>
  );
};

export default Deudas;