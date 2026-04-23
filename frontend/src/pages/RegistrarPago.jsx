import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axiosInstance";
import styles from "./RegistrarPago.module.css";

const RegistrarPago = () => {
  const { id } = useParams(); // venta_id
  const navigate = useNavigate();

  const [monto, setMonto] = useState("");
  const [loading, setLoading] = useState(false);
  const [venta, setVenta] = useState(null);

  // 🔥 traer info de la venta
  useEffect(() => {
    const fetchVenta = async () => {
      try {
        const res = await api.get(`/ventas/${id}`);
        setVenta(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVenta();
  }, [id]);

  // 🔥 calcular saldo
  const totalPagado =
    venta?.Pagos?.reduce((acc, p) => acc + Number(p.monto), 0) || 0;

  const saldoPendiente =
    venta ? Number(venta.total) - totalPagado : 0;

  const handlePago = async () => {
    if (!monto || Number(monto) <= 0) {
      alert("Ingrese un monto válido");
      return;
    }

    if (Number(monto) > saldoPendiente) {
      alert("No puede pagar más de lo que debe");
      return;
    }

    setLoading(true);

    try {
      await api.post("/pagos", {
        venta_id: id,
        monto: Number(monto),
      });

      alert("Pago registrado ✅");
      navigate("/deudas");

    } catch (error) {
      console.error(error);
      alert("Error al registrar pago ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>

      {/* 🔵 HEADER */}
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>
          Registrar Pago
        </h2>
      </div>

      {/* 🔙 VOLVER */}
      <button
        onClick={() => navigate(-1)}
        className={styles.btnBack}
      >
        ← Volver
      </button>

      {/* 🧾 INFO */}
      {venta && (
        <div className={styles.card}>

  <div className={styles.row}>
    <div className={styles.item}>
      <span className={styles.label}>Cliente</span>
      <span className={styles.value}>
        {venta.Cliente?.nombre || "—"}
      </span>
    </div>

    <div className={styles.item}>
      <span className={styles.label}>Total</span>
      <span className={styles.total}>
        ${Number(venta.total).toLocaleString()}
      </span>
    </div>

    <div className={styles.item}>
      <span className={styles.label}>Saldo</span>
      <span className={styles.saldo}>
        ${saldoPendiente.toLocaleString()}
      </span>
    </div>
  </div>

</div>
      )}

      {/* 💰 INPUT */}
      <label className={styles.label}>Monto a pagar</label>

      <input
        type="number"
        className={styles.input}
        placeholder="Ej: 50000"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
      />

      {/* ✅ BOTÓN */}
      <button
        onClick={handlePago}
        disabled={loading || saldoPendiente <= 0}
        className={styles.btnGuardar}
      >
        {loading ? "Guardando..." : "Confirmar pago"}
      </button>

    </div>
  );
};

export default RegistrarPago;