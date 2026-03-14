import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";

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
        navigate("/superadmin");
      } else {
        navigate("/home");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      {error && <p>{error}</p>}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Entrar</button>

    </form>
  );
}