import AccionesRapidas from "../components/home/AccionesRapidas";
import ResumenRapido from "../components/home/ResumenRapido";
import { useDashboard } from "../hooks/useDashboard";
import UltimaVenta from "../components/home/UltimaVenta";
import styles from "./Home.module.css";

const Home = () => {
  const { data, loading, error } = useDashboard();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error cargando dashboard</p>;

  return (
    <div className={styles.container}>

  <h2 className={styles.title}>Acciones</h2>
  <AccionesRapidas />

  <h2 className={styles.title}>Resumen</h2>
  <ResumenRapido
  totalPendiente={data.total_credito_pendiente}
  clientesDeuda={data.clientes_con_deuda}
  ventasHoy={data.ventas_hoy}
  ventasCantidad={data.cantidad_ventas_hoy}
/>
  <h2 className={styles.title}>Actividad</h2>
  <UltimaVenta venta={data.ultima_venta} />

</div>
  );
};

export default Home;