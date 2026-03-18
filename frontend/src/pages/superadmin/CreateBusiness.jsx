import { useState } from "react";
import { createNegocio } from "../../api/superAdminApi";
import styles from "./CreateBusiness.module.css";

export default function CreateBusiness() {

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await createNegocio({
        nombre,
        direccion
      });

      alert("Negocio creado correctamente");

      setNombre("");
      setDireccion("");

    } catch (error) {

      console.error(error);
      alert("Error creando negocio");

    }
  };

  return (

    <div className={styles.container}>

      <h1 className={styles.title}>Crear Negocio</h1>

      <form onSubmit={handleSubmit}>

        <div className={styles.formGroup}>
          <label>Nombre</label>

          <input
            className={styles.input}
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

        </div>

        <div className={styles.formGroup}>

          <label>Dirección</label>

          <input
            className={styles.input}
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />

        </div>

        <button
          className={styles.button}
          type="submit"
        >
          Crear negocio
        </button>

      </form>

    </div>

  );
}