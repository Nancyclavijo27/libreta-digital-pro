import { useNavigate } from "react-router-dom";

const ItemClienteDeuda = ({ cliente }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/cliente/${cliente.id}`)}
      style={{
        padding: "10px",
        borderBottom: "1px solid #ccc",
        cursor: "pointer",
      }}
    >
      <strong>{cliente.nombre}</strong>
      <p>Debe: ${cliente.saldo_deuda}</p>
    </div>
  );
};

export default ItemClienteDeuda;