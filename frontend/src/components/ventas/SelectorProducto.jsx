const SelectorProducto = ({ productos, onSelect }) => {
  return (
    <select onChange={(e) => onSelect(productos[e.target.value])}>
      <option>Seleccione producto</option>

      {productos.map((p, index) => (
        <option key={p.id} value={index}>
          {p.nombre}
        </option>
      ))}
    </select>
  );
};

export default SelectorProducto;