import { NavLink } from "react-router-dom";

export default function BottomNav() {
  return (
    <div>

      <NavLink to="/home">
        Home
      </NavLink>

      <NavLink to="/ventas">
        Ventas
      </NavLink>

      <NavLink to="/deudas">
        Deudas
      </NavLink>

      <NavLink to="/inventario">
        Inventario
      </NavLink>

    </div>
  );
}