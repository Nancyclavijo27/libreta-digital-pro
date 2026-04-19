import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { formatearMoneda } from "../utils/formatearMoneda";
import styles from "./ClienteDeuda.module.css";

const ClienteDeuda = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const fetchCliente = async () => {
      const res = await api.get(`/clientes/${id}`);
      setCliente(res.data);
    };

    fetchCliente();
  }, [id]);

  if (!cliente) return <p>Cargando...</p>;

  return (
  <div className={styles.container}>

    <button
      onClick={() => navigate("/deudas")}
      className={styles.btnBack}
    >
      ← Volver
    </button>

    <h2 className={styles.title}>{cliente.nombre}</h2>

    {/* 💰 TOTAL */}
    <div className={styles.totalBox}>
      <p className={styles.totalLabel}>Total pendiente</p>
      <p className={styles.totalNumero}>
        {formatearMoneda(cliente.saldo_deuda)}
      </p>
    </div>

    <h4 className={styles.subTitle}>Ventas</h4>

    {cliente.Venta?.map((v) => {
      const totalPagado =
        v.Pagos?.reduce((acc, p) => acc + Number(p.monto), 0) || 0;

      const saldo = Number(v.total) - totalPagado;

      const fechaVenta = new Date(v.fecha);
      const hoy = new Date();

      const dias = Math.floor(
        (hoy - fechaVenta) / (1000 * 60 * 60 * 24)
      );

      const vencida = dias > 30 && saldo > 0;

      return (
        <div key={v.id} className={styles.card}>

          <p className={styles.text}>
            <span className={styles.bold}>Fecha:</span> {v.fecha}
          </p>

          <p className={styles.text}>
            <span className={styles.bold}>Total:</span>{" "}
            {formatearMoneda(v.total)}
          </p>

          <p className={styles.text}>
            <span className={styles.bold}>Pagado:</span>{" "}
            {formatearMoneda(totalPagado)}
          </p>

          <p className={`${styles.text} ${styles.saldo}`}>
            <span className={styles.bold}>Saldo:</span>{" "}
            {formatearMoneda(saldo)}
          </p>

          {/* 🔴 vencida */}
          {vencida && (
            <div className={styles.alerta}>
              ⚠️ Deuda vencida
            </div>
          )}

          {/* botón */}
          {saldo > 0 && (
            <button
              onClick={() =>
                navigate(`/registrar-pago/${v.id}`)
              }
              className={styles.btnAbonar}
            >
              Abonar
            </button>
          )}

        </div>
      );
    })}
  </div>
);
};

export default ClienteDeuda;