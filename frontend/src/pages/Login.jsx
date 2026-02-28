import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosInstance";

import styles from "./Login.module.css";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
     

      data.user.role?.toUpperCase() === "ADMIN"
        ? navigate("/admin")
        : navigate("/home");

    } catch (err) {
      setError(err.response?.data?.message || "Email o contraseña incorrectos");
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <h2 className={styles.title}>Iniciar sesión</h2>

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" fullWidth>
            Entrar
          </Button>
        </form>

        <p className={styles.footerText}>
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </section>
    </main>
  );
}
