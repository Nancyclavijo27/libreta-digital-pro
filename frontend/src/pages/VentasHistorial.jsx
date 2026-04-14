import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import styles from "./VentasHistorial.module.css";

const VentasHistorial = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const res = await api.get("/ventas");
        setVentas(res.data);
      } catch (error) {
        console.error("Error cargando ventas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVentas();
  }, []);

  return (
    <div className={styles.container}>

      {/* 🔙 Volver */}
      <button
        onClick={() => navigate("/home")}
        className={styles.btnBack}
      >
        ← Volver
      </button>

      <h2 className={styles.title}>Historial de Ventas</h2>

      {/* ⏳ Cargando */}
      {loading && <p className={styles.loading}>Cargando ventas...</p>}

      {/* ❌ Sin datos */}
      {!loading && ventas.length === 0 && (
        <p className={styles.empty}>No hay ventas registradas</p>
      )}

      {/* ✅ Lista */}
      {!loading &&
        ventas.map((venta) => (
          <div key={venta.id} className={styles.card}>

            {/* fecha y hora */}
            <div className={styles.header}>
              <span>{venta.fecha}</span>
              <span>{venta.hora}</span>
            </div>

            {/* total */}
            <div className={styles.total}>
              Total: ${Number(venta.total).toLocaleString()}
            </div>

            {/* tipo pago */}
            <div className={styles.pago}>
              Pago: {venta.tipo_pago}
            </div>

            {/* productos */}
            {venta.DetalleVenta && (
              <div className={styles.productos}>
                <strong>Productos:</strong>
                <ul>
                  {venta.DetalleVenta.map((d) => (
                    <li key={d.id} className={styles.itemProducto}>
                      {d.Product?.nombre} × {d.cantidad} — $
                      {Number(d.subtotal).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        ))}
    </div>
  );
};

export default VentasHistorial;