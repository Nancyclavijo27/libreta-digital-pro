import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClientes } from "../hooks/useClientes";

const CrearCliente = () => {
  const navigate = useNavigate();
  const { crearCliente, loading } = useClientes();

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!form.nombre) {
      alert("Nombre obligatorio");
      return;
    }

    const ok = await crearCliente(form);

    if (ok) {
      navigate("/clientes");
    }
  };

  return (
    <div>
      <button onClick={() => navigate("/clientes")}>
        ← Volver
      </button>

      <h2>Crear Cliente</h2>

      <input
        name="nombre"
        placeholder="Nombre"
        onChange={handleChange}
      />

      <input
        name="telefono"
        placeholder="Teléfono"
        onChange={handleChange}
      />

      <input
        name="direccion"
        placeholder="Dirección"
        onChange={handleChange}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Guardando..." : "Crear Cliente"}
      </button>
    </div>
  );
};

export default CrearCliente;