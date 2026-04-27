import { useInventario } from "../hooks/useInventario";
import { useNavigate } from "react-router-dom";

import BuscadorProducto from "../components/inventario/BuscadorProducto";
import ListaInventario from "../components/inventario/ListaInventario";
import styles from "./Inventario.module.css";

const Inventario = () => {
  const navigate = useNavigate();

  const {
    productos,
    busqueda,
    setBusqueda,
    loading,
  } = useInventario();

  if (loading) return <p>Cargando...</p>;

  return (
    <div className={styles.container}>

  <div >
    <button
      className={styles.btnBack}
      onClick={() => navigate("/home")}
    >
      ← Volver
    </button>
  </div>

  <div className={styles.actions}>
    <button
      className={styles.button}
      onClick={() => navigate("/crear-producto")}
    >
      + Crear Producto
    </button>

    <button
      className={styles.button}
      onClick={() => navigate("/entrada")}
    >
      + Entrada Producto
    </button>
  </div>

  <div className={styles.search}>
    <BuscadorProducto
      busqueda={busqueda}
      setBusqueda={setBusqueda}
    />
  </div>

  <div className={styles.lista}>
    <ListaInventario productos={productos} />
  </div>

</div>
  );
};

export default Inventario;