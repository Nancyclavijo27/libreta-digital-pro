import ItemClienteDeuda from "./ItemClienteDeuda";

const ListaDeudas = ({ clientes }) => {
  if (clientes.length === 0) {
    return <p>No hay deudas</p>;
  }

  return (
    <div>
      {clientes.map((c) => (
        <ItemClienteDeuda key={c.id} cliente={c} />
      ))}
    </div>
  );
};

export default ListaDeudas;