import { useClientes } from "../../hooks/useClientes";
import styles from "./TipoPago.module.css";

const TipoPago = ({ tipoPago, setTipoPago, setClienteId }) => {
  const { clientes } = useClientes();

  return (
    <div className={styles.container}>
      <p className={styles.title}>Tipo de pago</p>

      <div className={styles.opciones}>

        {/* CONTADO */}
        <div
          className={`${styles.card} ${
            tipoPago === "contado" ? styles.activo : ""
          }`}
          onClick={() => setTipoPago("contado")}
        >
          <span>💵</span>
          <p>Contado</p>
        </div>

        {/* CRÉDITO */}
        <div
          className={`${styles.card} ${
            tipoPago === "credito" ? styles.activo : ""
          }`}
          onClick={() => setTipoPago("credito")}
        >
          <span>🧾</span>
          <p>Crédito</p>
        </div>

      </div>

      {/* 🔥 CLIENTE */}
      {tipoPago === "credito" && (
        <div className={styles.clienteBox}>
          <p className={styles.label}>Seleccionar cliente</p>

          <select
            className={styles.select}
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