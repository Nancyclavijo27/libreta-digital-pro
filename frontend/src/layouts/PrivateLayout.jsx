import Header from "../components/ui/Header";
import BottomNav from "../components/ui/BottomNav";
import { Outlet } from "react-router-dom";
import appLayout from "../styles/layout/appLayout.module.css";

export default function PrivateLayout() {
  return (
    <div className={appLayout.app}>

      <header className={appLayout.header}>
        <Header />
      </header>

      <main className={appLayout.main}>
        <Outlet />
      </main>

      <nav className={appLayout.bottomNav}>
        <BottomNav />
      </nav>

    </div>
  );
}