import { useNavigate } from "react-router-dom";
import { useDeudas } from "../hooks/useDeudas";
import ListaDeudas from "../components/deudas/ListaDeudas";
import styles from "./Deudas.module.css";

const Deudas = () => {
  const navigate = useNavigate();
  const { clientes, loading } = useDeudas();

  if (loading) return <p>Cargando...</p>;

  // 🔥 total deuda
  const total = clientes.reduce(
    (acc, c) => acc + Number(c.saldo_deuda || 0),
    0
  );

  return (
    <div className={styles.container}>

      <div className={styles.topActions}>
        <button
          onClick={() => navigate("/home")}
          className={styles.btnBack}
        >
          ← Volver
        </button>

        <button
          onClick={() => navigate("/crear-cliente")}
          className={styles.btnNew}
        >
          + Cliente
        </button>
      </div>

      <h2 className={styles.title}>Deudas</h2>

      {/* 🔥 TOTAL */}
      <div className={styles.totalBox}>
  <p className={styles.totalLabel}>Total pendiente</p>
  <p className={styles.totalNumero}>
    ${total.toLocaleString()}
  </p>
</div>

      <ListaDeudas clientes={clientes} />

    </div>
  );
};

export default Deudas;