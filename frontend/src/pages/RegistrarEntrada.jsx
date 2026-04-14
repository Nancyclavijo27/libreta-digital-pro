import { useEntradas } from "../hooks/useEntradas";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrarEntrada.module.css";

const RegistrarEntrada = () => {
  const navigate = useNavigate();

  const {
    productos,
    productoSeleccionado,
    cantidad,
    costo,
    loading,
    setCantidad,
    setCosto,
    seleccionarProducto,
    crearEntrada,
  } = useEntradas();

  const handleGuardar = async () => {
    if (!productoSeleccionado) {
      alert("Seleccione un producto");
      return;
    }

    const ok = await crearEntrada();

    if (ok) {
      navigate("/inventario");
    }
  };

  return (
    <div className={styles.container}>

      <button
        onClick={() => navigate("/inventario")}
        className={styles.btnBack}
      >
        ← Volver
      </button>

      <h2 className={styles.title}>Registrar Entrada</h2>

      {/* PRODUCTO */}
      <label className={styles.label}>Producto</label>

      <select
        className={styles.select}
        value={productoSeleccionado?.id || ""}
        onChange={(e) => {
          const producto = productos.find(
            (p) => p.id === Number(e.target.value)
          );
          seleccionarProducto(producto);
        }}
      >
        <option value="">Seleccionar producto</option>

        {productos.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nombre}
          </option>
        ))}
      </select>

      {/* STOCK */}
      {productoSeleccionado && (
        <p className={styles.info}>
  Stock actual:{" "}
  <span className={styles.stockNumero}>
    {Number(productoSeleccionado.stock).toLocaleString()}{" "}
    {productoSeleccionado.unidad}
  </span>
</p>
      )}

      {/* CANTIDAD */}
      <label className={styles.label}>Cantidad</label>

      <div className={styles.row}>
        <input
          type="text"
          inputMode="decimal"
          className={styles.inputSmall}
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          placeholder="0"
        />

        <div className={styles.unidad}>
          {productoSeleccionado?.unidad || "Unidad"}
        </div>
      </div>

      {/* COSTO */}
      <label className={styles.label}>Costo</label>

      <input
        type="text"
        inputMode="numeric"
        className={styles.input}
        value={costo}
        onChange={(e) => setCosto(Number(e.target.value))}
        placeholder="Ej: 5000"
      />

      {/* TOTAL */}
      <p className={styles.totalCosto}>
  Total compra:{" "}
  <span className={styles.totalNumero}>
    ${Number(cantidad * costo || 0).toLocaleString()}
  </span>
</p>

      {/* BOTÓN */}
      <button
        onClick={handleGuardar}
        disabled={loading}
        className={styles.btnGuardar}
      >
        {loading ? "Guardando..." : "Guardar Entrada"}
      </button>

    </div>
  );
};

export default RegistrarEntrada;