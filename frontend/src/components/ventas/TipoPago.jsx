const TipoPago = ({ tipoPago, setTipoPago, setClienteId }) => {
  return (
    <div>
      <p>Tipo de pago</p>

      <label>
        <input
          type="radio"
          value="contado"
          checked={tipoPago === "contado"}
          onChange={(e) => setTipoPago(e.target.value)}
        />
        Contado
      </label>

      <label>
        <input
          type="radio"
          value="credito"
          checked={tipoPago === "credito"}
          onChange={(e) => setTipoPago(e.target.value)}
        />
        Crédito
      </label>

      {tipoPago === "credito" && (
        <input
          placeholder="ID Cliente"
          onChange={(e) => setClienteId(e.target.value)}
        />
      )}
    </div>
  );
};

export default TipoPago;