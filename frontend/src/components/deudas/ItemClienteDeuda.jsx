import { useNavigate } from "react-router-dom";
import styles from "./ItemClienteDeuda.module.css";

const ItemClienteDeuda = ({ cliente }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>

  {/* ICONO */}
  <div className={styles.avatar}>
    👤
    <span className={styles.dot}></span>
  </div>

  {/* NOMBRE */}
  <span className={styles.nombre}>
    {cliente.nombre}
  </span>

  {/* DEUDA */}
  <span className={styles.deuda}>
    ${Number(cliente.saldo_deuda).toLocaleString()}
  </span>

  {/* ESTADO */}
  <span className={styles.estado}>
    Pendiente
  </span>

  {/* BOTÓN */}
  <button
    className={styles.btnVer}
    onClick={() => navigate(`/cliente/${cliente.id}`)}
  >
    Ver
  </button>

</div>
  );
};

export default ItemClienteDeuda;