import { useClientes } from "../hooks/useClientes";
import { useNavigate } from "react-router-dom";

const Clientes = () => {
  const navigate = useNavigate();
  const { clientes, loading } = useClientes();

  return (
    <div style={{ padding: "20px" }}>

      {/* 🔙 volver */}
      <button onClick={() => navigate("/home")}>
        ← Volver
      </button>

      <h2>👤 Clientes</h2>

      {/* 🔹 acción */}
      <button onClick={() => navigate("/crear-cliente")}>
        + Crear Cliente
      </button>

      {/* 🔹 estado */}
      {loading && <p>Cargando...</p>}

      {/* 🔹 lista */}
      {clientes.length === 0 && <p>No hay clientes</p>}

      {clientes.map((c) => (
        <div
          key={c.id}
          style={{
            borderBottom: "1px solid #ccc",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/cliente/${c.id}`)} // 🔥 opcional futuro
        >
          <strong>{c.nombre}</strong>
          <p>Tel: {c.telefono}</p>
        </div>
      ))}
    </div>
  );
};

export default Clientes;