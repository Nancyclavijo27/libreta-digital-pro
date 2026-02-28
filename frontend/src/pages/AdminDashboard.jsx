
import { useNavigate } from "react-router-dom";




import Button from "../components/ui/Button";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  
  
  return (
    <main className={styles.page}>
      <h1>Panel Admin</h1>

      <Button onClick={() => navigate("/home")}>Volver</Button>
    </main>
  );
}
