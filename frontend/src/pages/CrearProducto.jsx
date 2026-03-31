import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";

const CrearProducto = () => {
  const navigate = useNavigate();
  const { crearProducto, loading } = useProductos();

  const [form, setForm] = useState({
    nombre: "",
    unidad: "",
    precio_base: "",
    stock: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!form.nombre || !form.unidad || !form.precio_base) {
      alert("Complete los campos obligatorios");
      return;
    }

    const ok = await crearProducto(form);

    if (ok) {
      navigate("/productos");
    }
  };

  return (
    <div>
      {/* 🔙 Volver */}
      <button onClick={() => navigate("/productos")}>
        ← Volver
      </button>

      <h2>Crear Producto</h2>

      <div>
        <input
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          name="unidad"
          placeholder="Unidad (kg, unidad)"
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          name="precio_base"
          type="number"
          placeholder="Precio"
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          name="stock"
          type="number"
          placeholder="Stock inicial"
          onChange={handleChange}
        />
      </div>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Guardando..." : "Crear Producto"}
      </button>
    </div>
  );
};

export default CrearProducto;