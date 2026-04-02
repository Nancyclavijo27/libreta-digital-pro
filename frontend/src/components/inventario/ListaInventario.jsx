import ItemProducto from "./ItemProducto";

const ListaInventario = ({ productos }) => {
  if (productos.length === 0) {
    return <p>No hay productos</p>;
  }

  return (
    <div>
      {productos.map((p) => (
        <ItemProducto key={p.id} producto={p} />
      ))}
    </div>
  );
};

export default ListaInventario;