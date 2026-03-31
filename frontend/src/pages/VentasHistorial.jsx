import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

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
    <div>
      {/* 🔙 Volver */}
      <button onClick={() => navigate("/home")}>
        ← Volver
      </button>

      <h2>Historial de Ventas</h2>

      {/* ⏳ Cargando */}
      {loading && <p>Cargando ventas...</p>}

      {/* ❌ Sin datos */}
      {!loading && ventas.length === 0 && (
        <p>No hay ventas registradas</p>
      )}

      {/* ✅ Lista */}
      {!loading &&
        ventas.map((venta) => (
          <div key={venta.id} style={styles.card}>
            
            <p><strong>Fecha:</strong> {venta.fecha}</p>
            <p><strong>Hora:</strong> {venta.hora}</p>

            <p>
              <strong>Total:</strong> ${venta.total}
            </p>

            <p>
              <strong>Pago:</strong> {venta.tipo_pago}
            </p>

            {/* 👇 productos vendidos */}
            {venta.DetalleVenta && (
              <div>
                <strong>Productos:</strong>
                <ul>
                  {venta.DetalleVenta.map((d) => (
                    <li key={d.id}>
                      {d.Product?.nombre} | Cantidad: {d.cantidad} | ${d.subtotal}
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

const styles = {
  card: {
    background: "#fff",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
  },
};

export default VentasHistorial;