import ItemClienteDeuda from "./ItemClienteDeuda";
import styles from "./ListaDeudas.module.css";

const ListaDeudas = ({ clientes }) => {
  if (clientes.length === 0) {
    return <p className={styles.vacio}>No hay deudas</p>;
  }

  return (
    <div className={styles.lista}>
      {clientes.map((c) => (
        <ItemClienteDeuda key={c.id} cliente={c} />
      ))}
    </div>
  );
};

export default ListaDeudas;