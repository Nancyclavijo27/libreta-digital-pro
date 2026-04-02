const BuscadorProducto = ({ busqueda, setBusqueda }) => {
  return (
    <input
      placeholder="Buscar producto..."
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
    />
  );
};

export default BuscadorProducto;