import AccionesRapidas from "../components/home/AccionesRapidas";
import ResumenRapido from "../components/home/ResumenRapido";
import { useDashboard } from "../hooks/useDashboard";

const Home = () => {
  const { data, loading, error } = useDashboard();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error cargando dashboard</p>;

  return (
    <div>
      

      {/* ACCIONES */}
      <AccionesRapidas />

      {/* RESUMEN */}
      <ResumenRapido
        totalInventario={data.totalInventario}
        totalPendiente={data.totalPendiente}
      />
    </div>
  );
};

export default Home;