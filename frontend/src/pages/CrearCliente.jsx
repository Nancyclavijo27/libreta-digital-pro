import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClientes } from "../hooks/useClientes";
import styles from "./CrearCliente.module.css";

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
    <div className={styles.container}>

  <button
    onClick={() => navigate("/clientes")}
    className={styles.btnBack}
  >
    ← Volver
  </button>

  <h2 className={styles.title}>Crear Cliente</h2>

  {/* NOMBRE */}
  <label className={styles.label}>Nombre *</label>
  <input
    name="nombre"
    className={styles.input}
    placeholder="Ej: Juan Pérez"
    onChange={handleChange}
  />

  {/* TELÉFONO */}
  <label className={styles.label}>Teléfono</label>
  <input
    name="telefono"
    className={styles.input}
    placeholder="Ej: 3001234567"
    onChange={handleChange}
  />

  {/* DIRECCIÓN */}
  <label className={styles.label}>Dirección</label>
  <input
    name="direccion"
    className={styles.input}
    placeholder="Ej: Local 12 - Plaza"
    onChange={handleChange}
  />

  {/* BOTÓN */}
  <button
    onClick={handleSubmit}
    disabled={loading}
    className={styles.btnGuardar}
  >
    {loading ? "Guardando..." : "Guardar Cliente"}
  </button>

</div>
  );
};

export default CrearCliente;