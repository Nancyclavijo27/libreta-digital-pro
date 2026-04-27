import ItemProducto from "./ItemProducto";
import styles from "./ListaInventario.module.css";

const ListaInventario = ({ productos }) => {
  if (productos.length === 0) {
    return <p>No hay productos</p>;
  }

  return (
    <div  className={styles.container}>
      {productos.map((p) => (
        <ItemProducto key={p.id} producto={p} />
      ))}
    </div>
  );
};

export default ListaInventario;