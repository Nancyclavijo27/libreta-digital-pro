import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

export const useEntradas = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const [cantidad, setCantidad] = useState(1);
  const [costo, setCosto] = useState(0);

  const [loading, setLoading] = useState(false);

  // 🔹 traer productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await api.get("/productos");
        setProductos(res.data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    fetchProductos();
  }, []);

  // 🔹 seleccionar producto
  const seleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
  };

  // 🔹 crear entrada
  const crearEntrada = async () => {
    if (!productoSeleccionado) {
      alert("Seleccione un producto");
      return false;
    }

    setLoading(true);

    try {
      const payload = {
        producto_id: productoSeleccionado.id,
        cantidad,
        costo_unitario: costo,
      };

      await api.post("/entradas", payload);

      alert("Entrada registrada ✅");

      // reset
      setProductoSeleccionado(null);
      setCantidad(1);
      setCosto(0);

      return true;

    } catch (error) {
      console.error(error);
      alert("Error registrando entrada ❌");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    productos,
    productoSeleccionado,
    cantidad,
    costo,
    loading,

    setCantidad,
    setCosto,
    seleccionarProducto,
    crearEntrada,
  };
};