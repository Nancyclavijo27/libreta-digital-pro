import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import styles from "./Login.module.css";

export default function Login() {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const { data } = await api.post("/auth/login", {
        username,
        password
      });

      // 🔐 guardar en context
      login(data.user, data.token);

      // 👑 redirección por rol
      if (data.user.rol === "superadmin") {
        navigate("/superadmin/dashboard");
      } else {
        navigate("/home");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
  <div className={styles.container}>

    <div className={styles.cardWrapper}>

      <img src="/logo.png" className={styles.image} />

      <h1 className={styles.title}>
        Libreta Digital <span>Pro</span>
      </h1>

      <form onSubmit={handleSubmit} className={styles.form}>

        {error && <p>{error}</p>}

        <div className={styles.inputBox}>
          <span className={styles.icon}>📧</span>
          <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.inputBox}>
          <span className={styles.icon}>🔒</span>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.button}>
          Entrar
        </button>

      </form>

      

      <p className={styles.copy}>
        © 2025 Libreta Digital Pro - Nancy Clavijo
      </p>

    </div>
  </div>
);
}