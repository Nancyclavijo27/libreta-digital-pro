import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/UserProfile";
import Ventas from "./pages/Ventas";
import Deudas from "./pages/Deudas";
import Inventario from "./pages/Inventario";
import Productos from "./pages/Productos";
import CrearProducto from "./pages/CrearProducto";
import VentasHistorial from "./pages/VentasHistorial";

import AdminDashboard from "./pages/superadmin/AdminDashboard";
import CreateBusiness from "./pages/superadmin/CreateBusiness";
import Businesses from "./pages/superadmin/Businesses";
import CreateUser from "./pages/superadmin/CreateUser";
import Users from "./pages/superadmin/Users";

import ProtectedRoute from "./components/ProtectedRoute";
import PrivateLayout from "./layouts/PrivateLayout";
import SuperAdminLayout from "./layouts/SuperAdminLayout"; // <-- nuevo layout

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 Públicas */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* 🔐 Protegidas generales */}
        <Route
          element={
            <ProtectedRoute>
              <PrivateLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/deudas" element={<Deudas />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/crear-producto" element={<CrearProducto />} />
          <Route path="/ventas-historial" element={<VentasHistorial />} />
          </Route>

        {/* 👑 SUPERADMIN */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <SuperAdminLayout /> {/* <-- aquí usamos el layout exclusivo */}
            </ProtectedRoute>
          }
        >
          <Route path="/superadmin/dashboard" element={<AdminDashboard />} />
          <Route path="/superadmin/create-business" element={<CreateBusiness />} />
          <Route path="/superadmin/businesses" element={<Businesses />} />
          <Route path="/superadmin/create-user" element={<CreateUser />} />
          <Route path="/superadmin/users" element={<Users />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;