import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/UserProfile";
import Ventas from "./pages/Ventas";
import Deudas from "./pages/Deudas";
import Inventario from "./pages/Inventario";
import CrearProducto from "./pages/CrearProducto";
import VentasHistorial from "./pages/VentasHistorial";
import RegistrarEntrada from "./pages/RegistrarEntrada";
import DetalleProducto from "./pages/DetalleProducto";
import ClienteDeuda from "./pages/ClienteDeuda";
import RegistrarPago from "./pages/RegistrarPago";
import Clientes from "./pages/Clientes";
import CrearCliente from "./pages/CrearCliente";

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
        <Route path="/" element={<Navigate to="/login" replace />} />
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
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/crear-producto" element={<CrearProducto />} />
          <Route path="/ventas-historial" element={<VentasHistorial />} />
          <Route path="/entrada" element={<RegistrarEntrada />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/deudas" element={<Deudas />} />
          <Route path="/cliente/:id" element={<ClienteDeuda />} />
          <Route path="/registrar-pago/:id" element={<RegistrarPago />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/crear-cliente" element={<CrearCliente />} />
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