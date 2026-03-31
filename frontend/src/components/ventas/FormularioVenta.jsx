const FormularioVenta = ({
  cantidad,
  setCantidad,
  precio,
  setPrecio,
  total,
}) => {
  return (
    <div>

      <p>Cantidad</p>
      <input
        type="text"
        inputMode="numeric"
        value={cantidad}
        onChange={(e) => setCantidad(Number(e.target.value) || 0)}
      />

      <p>Precio por unidad</p>
      <input
        type="text"
        inputMode="numeric"
        value={precio}
        onChange={(e) => setPrecio(Number(e.target.value) || 0)}
      />

      <p><strong>Total: ${total}</strong></p>

    </div>
  );
};

export default FormularioVenta;