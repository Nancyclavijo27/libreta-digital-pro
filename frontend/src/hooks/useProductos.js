import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 listar productos
  const obtenerProductos = async () => {
    try {
      const res = await api.get("/productos");
      setProductos(res.data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  // 🔹 crear producto
  const crearProducto = async (data) => {
    setLoading(true);

    try {
      await api.post("/productos", data);
      alert("Producto creado ✅");
      await obtenerProductos();
      return true;
    } catch (error) {
      console.error(error);
      alert("Error al crear producto");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 cargar al iniciar
  useEffect(() => {
    obtenerProductos();
  }, []);

  return {
    productos,
    loading,
    crearProducto,
    obtenerProductos,
  };
};