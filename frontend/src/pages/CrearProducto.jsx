import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";
import styles from "./CrearProducto.module.css";

const CrearProducto = () => {
  const navigate = useNavigate();
  const { crearProducto, loading, productos } = useProductos();

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

    const nombreLimpio = form.nombre.trim();

    if (!nombreLimpio) {
      alert("Nombre inválido");
      return;
    }

    const existe = productos.some(
      (p) => p.nombre.toLowerCase().trim() === nombreLimpio.toLowerCase()
    );

    if (existe) {
      alert("Este producto ya existe");
      return;
    }

    if (!form.unidad) {
      alert("Seleccione una unidad");
      return;
    }

    if (!form.precio_base || Number(form.precio_base) <= 0) {
      alert("El precio debe ser mayor a 0");
      return;
    }

    if (form.stock && Number(form.stock) < 0) {
      alert("El stock no puede ser negativo");
      return;
    }

    const payload = {
      ...form,
      nombre: nombreLimpio,
      precio_base: Number(form.precio_base),
      stock: Number(form.stock) || 0,
    };

    const ok = await crearProducto(payload);

    if (ok) navigate("/inventario");
  };

  return (
    <div className={styles.container}>

      <button
        onClick={() => navigate("/inventario")}
        className={styles.btnBack}
      >
        ← Volver
      </button>

      <h2 className={styles.title}>Crear Producto</h2>

      {/* NOMBRE */}
      <label className={styles.label}>Nombre</label>
      <input
        name="nombre"
        className={styles.input}
        placeholder="Ej: Pera"
        onChange={handleChange}
      />

      {/* UNIDAD */}
      <label className={styles.label}>Unidad</label>
      <select
        name="unidad"
        className={styles.select}
        value={form.unidad}
        onChange={handleChange}
      >
        <option value="">Seleccionar unidad</option>
        <option value="unidad">Unidad</option>
        <option value="bultos">Bultos</option>
        <option value="kg">Kilos</option>
        <option value="cajas">Cajas</option>
      </select>

      {/* PRECIO */}
      <label className={styles.label}>Precio</label>
      <input
        name="precio_base"
        type="number"
        className={styles.input}
        placeholder="Ej: 5000"
        onChange={handleChange}
      />

      {/* STOCK */}
      <label className={styles.label}>Stock inicial</label>
      <input
        name="stock"
        type="number"
        className={styles.input}
        placeholder="Ej: 10"
        onChange={handleChange}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={styles.btnGuardar}
      >
        {loading ? "Guardando..." : "Guardar Producto"}
      </button>

    </div>
  );
};

export default CrearProducto;