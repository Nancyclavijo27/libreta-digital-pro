import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

export const useVentas = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const [cantidad, setCantidad] = useState(1);
  const [precio, setPrecio] = useState(0);

  const [tipoPago, setTipoPago] = useState("contado");
  const [clienteId, setClienteId] = useState(null);

  const [loading, setLoading] = useState(false);

  // 🔹 Obtener productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await api.get("/productos");
        setProductos(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductos();
  }, []);

  // 🔹 seleccionar producto
  const seleccionarProducto = (producto) => {
    if (!producto) return;

    setProductoSeleccionado(producto);
    setPrecio(Number(producto.precio_base) || 0);
    setCantidad(1);
  };

  const total = cantidad * precio;

  // 🔥 CREAR VENTA
  const crearVenta = async () => {
    if (!productoSeleccionado) {
      alert("Seleccione un producto");
      return false;
    }

    // 🔥 VALIDACIÓN CLAVE (AQUÍ VA)
    if (tipoPago === "credito" && !clienteId) {
      alert("⚠️ Selecciona un cliente antes de continuar");
      return false;
    }

    setLoading(true);

    try {
      const payload = {
        productos: [
          {
            producto_id: productoSeleccionado.id,
            cantidad,
            precio_unitario: precio,
          },
        ],
        tipo_pago: tipoPago,
        cliente_id: tipoPago === "credito" ? clienteId : null,
      };

      await api.post("/ventas", payload);

      alert("Venta registrada ✅");

      // reset
      setProductoSeleccionado(null);
      setCantidad(1);
      setPrecio(0);
      setClienteId(null);

      return true;

    } catch (error) {
      console.error(error);
      alert("Error en venta ❌");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    productos,
    productoSeleccionado,
    cantidad,
    precio,
    tipoPago,
    total,
    loading,

    setCantidad,
    setPrecio,
    setTipoPago,
    setClienteId,
    seleccionarProducto,
    crearVenta,
  };
};