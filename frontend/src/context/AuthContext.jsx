import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

  // 👤 usuario guardado en localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 🔑 token guardado
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  // 🔐 login
  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
  };

  // 🚪 logout
  const logout = () => {
    setUser(null);
    setToken(null);
  };

  // 💾 sincronizar con localStorage automáticamente
  useEffect(() => {

    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }

  }, [user, token]);

  // 🎭 roles
  const isSuperAdmin = user?.rol === "superadmin";
  const isAdmin = user?.rol === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isSuperAdmin,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}