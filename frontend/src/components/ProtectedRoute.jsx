import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, token } = useContext(AuthContext);

  // 🔐 no autenticado
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 🎭 validar rol
  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/home" replace />;
  }

  return children;
}