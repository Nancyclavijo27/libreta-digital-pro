import { useVentas } from "../hooks/useVentas";
import { useNavigate } from "react-router-dom";

import SelectorProducto from "../components/ventas/SelectorProducto";
import FormularioVenta from "../components/ventas/FormularioVenta";
import TipoPago from "../components/ventas/TipoPago";
import BotonConfirmarVenta from "../components/ventas/BotonConfirmarVenta";

const Ventas = () => {
  const navigate = useNavigate();

  const {
    productos,
    productoSeleccionado,
    cantidad,
    precio,
    total,
    tipoPago,
    loading,

    setCantidad,
    setPrecio,
    setTipoPago,
    setClienteId,
    seleccionarProducto,
    crearVenta,
  } = useVentas();

  const handleVenta = async () => {
    const ok = await crearVenta();

    if (ok) {
      navigate("/home");
    }
  };

  return (
    <div>
      <button onClick={() => navigate("/home")}>
        ← Volver
      </button>

      <h2>Registrar Venta</h2>

      
      <button onClick={() => navigate("/ventas-historial")}>
        Ver Ventas
      </button>


      {/* 👇 PRODUCTO */}
      <SelectorProducto
        productos={productos}
        onSelect={seleccionarProducto}
      />

      {/* 👇 INFO CLARA */}
      {productoSeleccionado && (
        <p>
          Producto: <strong>{productoSeleccionado.nombre}</strong> ({productoSeleccionado.unidad})
        </p>
      )}

      {/* 👇 FORMULARIO */}
      <FormularioVenta
        cantidad={cantidad}
        setCantidad={setCantidad}
        precio={precio}
        setPrecio={setPrecio}
        total={total}
      />

      <TipoPago
        tipoPago={tipoPago}
        setTipoPago={setTipoPago}
        setClienteId={setClienteId}
      />

      <BotonConfirmarVenta
        onConfirm={handleVenta}
        loading={loading}
      />
    </div>
  );
};

export default Ventas;