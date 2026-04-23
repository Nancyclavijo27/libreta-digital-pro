import { useClientes } from "../hooks/useClientes";
import { useNavigate } from "react-router-dom";
import styles from "./Clientes.module.css";

const Clientes = () => {
  const navigate = useNavigate();
  const { clientes, loading } = useClientes();

  return (
    <div className={styles.container}>

      {/* 🔙 volver */}
      <button
        onClick={() => navigate("/home")}
        className={styles.btnBack}
      >
        ← Volver
      </button>

      <h2 className={styles.title}>Clientes</h2>

      {/* estado */}
      {loading && <p>Cargando...</p>}

      {/* vacío */}
      {!loading && clientes.length === 0 && (
        <p className={styles.vacio}>No hay clientes</p>
      )}

      {/* lista */}
      <div className={styles.lista}>
        {clientes.map((c) => (
          <div
            key={c.id}
            className={styles.card}
            onClick={() => navigate(`/cliente/${c.id}`)}
          >
            <div className={styles.icono}>👤</div>

            <div className={styles.info}>
              <span className={styles.nombre}>
                {c.nombre}
              </span>

              <div className={styles.rowDeuda}>
                <span className={styles.telefono}>
                  Tel: {c.telefono || "—"}
                </span>

                {c.saldo_deuda > 0 && (
                  <span className={styles.badge}>
                    Debe
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Clientes;