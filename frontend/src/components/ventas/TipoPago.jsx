import { useClientes } from "../../hooks/useClientes";

const TipoPago = ({ tipoPago, setTipoPago, setClienteId }) => {
  const { clientes } = useClientes();

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

      {/* 🔥 SOLO SI ES CRÉDITO */}
      {tipoPago === "credito" && (
        <div style={{ marginTop: "10px" }}>
          <p>Seleccionar cliente</p>

          <select
            onChange={(e) => setClienteId(Number(e.target.value))}
          >
            <option value="">Seleccione cliente</option>

            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default TipoPago;