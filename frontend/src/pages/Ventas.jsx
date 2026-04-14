import { useVentas } from "../hooks/useVentas";
import { useNavigate } from "react-router-dom";

import SelectorProducto from "../components/ventas/SelectorProducto";
import ListaProductos from "../components/ventas/ListaProductos";
import TipoPago from "../components/ventas/TipoPago";
import BotonConfirmarVenta from "../components/ventas/BotonConfirmarVenta";

import styles from "./Ventas.module.css";

const Ventas = () => {
  const navigate = useNavigate();

  const {
    productos,
    items,
    tipoPago,
    total,
    loading,

    setTipoPago,
    setClienteId,

    seleccionarProducto,
    cambiarCantidad,
    eliminarProducto,
    crearVenta,
  } = useVentas();

  const handleVenta = async () => {
    const ok = await crearVenta();
    if (ok) navigate("/home");
  };

  return (
    <div className={styles.container}>

      <div className={styles.topActions}>
  <button onClick={() => navigate("/home")} className={styles.btnBack}>
    ← Volver
  </button>

  <button onClick={() => navigate("/ventas-historial")} className={styles.btnView}>
    Ver ventas
  </button>
</div>

<h2 className={styles.title}>Registrar Venta</h2>

      {/* 🔥 SELECTOR */}
      <SelectorProducto
        productos={productos}
        onSelect={seleccionarProducto}
      />

      {/* 🔥 LISTA */}
      <ListaProductos
        items={items}
        cambiarCantidad={cambiarCantidad}
        eliminarProducto={eliminarProducto}
      />

      {/* 🔥 TOTAL */}
      <div className={styles.totalBox}>
  <span>Total:</span>
  <span className={styles.totalNumero}>
    ${total.toLocaleString()}
  </span>
</div>

      {/* 🔥 PAGO */}
      <TipoPago
        tipoPago={tipoPago}
        setTipoPago={setTipoPago}
        setClienteId={setClienteId}
      />

      {/* 🔥 BOTÓN */}
      <BotonConfirmarVenta
        onConfirm={handleVenta}
        loading={loading}
      />

    </div>
  );
};

export default Ventas;