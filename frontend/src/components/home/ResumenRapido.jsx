const ResumenRapido = ({ totalInventario, totalPendiente }) => {
  return (
    <div>
      <h3>Resumen</h3>

      <p>Inventario total: {totalInventario}</p>
      <p>Total pendiente: ${totalPendiente}</p>
    </div>
  );
};

export default ResumenRapido;