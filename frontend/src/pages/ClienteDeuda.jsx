import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { formatearMoneda } from "../utils/formatearMoneda";

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
    <div>
      {/* 🔙 volver */}
      <button onClick={() => navigate("/deudas")}>
        ← Volver
      </button>

      <h2>{cliente.nombre}</h2>

      {/* 💰 TOTAL */}
      <h3>
        Total pendiente: {formatearMoneda(cliente.saldo_deuda)}
      </h3>

      <h4>Ventas</h4>

      {cliente.Venta?.map((v) => {
        // 🔥 calcular pagos
        const totalPagado =
          v.Pagos?.reduce(
            (acc, p) => acc + Number(p.monto),
            0
          ) || 0;

        const saldo = Number(v.total) - totalPagado;

        // 🔥 detectar vencimiento (ej: +30 días)
        const fechaVenta = new Date(v.fecha);
        const hoy = new Date();

        const dias = Math.floor(
          (hoy - fechaVenta) / (1000 * 60 * 60 * 24)
        );

        const vencida = dias > 30 && saldo > 0;

        return (
          <div
            key={v.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <p><strong>Fecha:</strong> {v.fecha}</p>

            <p>
              <strong>Total:</strong>{" "}
              {formatearMoneda(v.total)}
            </p>

            <p>
              <strong>Pagado:</strong>{" "}
              {formatearMoneda(totalPagado)}
            </p>

            <p>
              <strong>Saldo:</strong>{" "}
              {formatearMoneda(saldo)}
            </p>

            {/* 🔴 ALERTA */}
            {vencida && (
              <p style={{ color: "red" }}>
                ⚠️ Deuda vencida
              </p>
            )}

            {/* 🔥 BOTÓN ABONAR */}
            {saldo > 0 && (
              <button
                onClick={() =>
                  navigate(`/registrar-pago/${v.id}`)
                }
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