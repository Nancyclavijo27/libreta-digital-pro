const BotonConfirmarVenta = ({ onConfirm, loading }) => {
  return (
    <button onClick={onConfirm} disabled={loading}>
      {loading ? "Guardando..." : "Confirmar Venta"}
    </button>
  );
};

export default BotonConfirmarVenta;