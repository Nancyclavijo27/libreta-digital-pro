import { useState } from "react";
import { createUsuario } from "../../api/superAdminApi";
import styles from "./CreateUser.module.css"; // <-- módulo CSS

export default function CreateUser() {

  const [nombre, setNombre] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("dueno");
  const [negocioId, setNegocioId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUsuario({
        nombre,
        username,
        password,
        rol,
        negocio_id: negocioId
      });

      alert("Usuario creado");

      // Limpiar formulario
      setNombre("");
      setUsername("");
      setPassword("");
      setRol("dueno");
      setNegocioId("");

    } catch (error) {
      console.error(error);
      alert("Error creando usuario");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crear Usuario</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Nombre</label>
          <input
            className={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Username</label>
          <input
            className={styles.input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Rol</label>
          <select
            className={styles.input}
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="dueno">Dueño</option>
            <option value="empleado">Empleado</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Negocio ID</label>
          <input
            className={styles.input}
            placeholder="Negocio ID"
            value={negocioId}
            onChange={(e) => setNegocioId(e.target.value)}
          />
        </div>

        <button className={styles.button} type="submit">
          Crear Usuario
        </button>
      </form>
    </div>
  );
}