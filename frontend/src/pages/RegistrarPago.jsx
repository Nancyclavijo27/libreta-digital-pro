import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axiosInstance";

const RegistrarPago = () => {
  const { id } = useParams(); // 🔥 ESTE ES venta_id
  const navigate = useNavigate();

  const [monto, setMonto] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePago = async () => {
    if (!monto) {
      alert("Ingrese monto");
      return;
    }

    setLoading(true);

    try {
      await api.post("/pagos", {
        venta_id: id, // ✅ AHORA SÍ SE USA
        monto,
      });

      alert("Pago registrado ✅");
      navigate("/deudas");

    } catch (error) {
      console.error(error);
      alert("Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <h2>Registrar Pago</h2>

      <p>Venta ID: {id}</p>

      <input
        type="number"
        placeholder="Monto"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
      />

      <button onClick={handlePago} disabled={loading}>
        {loading ? "Guardando..." : "Confirmar Pago"}
      </button>
    </div>
  );
};

export default RegistrarPago;