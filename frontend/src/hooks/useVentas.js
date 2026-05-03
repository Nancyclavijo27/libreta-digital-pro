import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

export const useVentas = () => {
  const [productos, setProductos] = useState([]);

  // 🔥 NUEVO → lista de productos en la venta
  const [items, setItems] = useState([]);

  // 🔥 dejamos esto para compatibilidad (NO lo quitamos)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

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

  // 🔥 AGREGAR PRODUCTO (CLAVE)
  const seleccionarProducto = (producto) => {
    if (!producto) return;

    setProductoSeleccionado(producto);

    // 🔍 buscar si ya existe en la lista
    const existe = items.find(i => i.producto_id === producto.id);

    if (existe) {
      // 🔁 si ya existe → suma cantidad
      setItems(items.map(i =>
        i.producto_id === producto.id
          ? { ...i, cantidad: i.cantidad + 1 }
          : i
      ));
    } else {
      // ➕ nuevo producto
      setItems([
        ...items,
        {
          producto_id: producto.id,
          nombre: producto.nombre,
          precio_unitario: Number(producto.precio_base) || 0,
          cantidad: 1,
        }
      ]);
    }
  };

  // 🔥 CAMBIAR CANTIDAD
  const cambiarCantidad = (id, valor) => {
  setItems(items.map(i => {
    if (i.producto_id === id) {
      const nuevaCantidad = Number(valor);

      return {
        ...i,
        cantidad: nuevaCantidad > 0 ? nuevaCantidad : 1
      };
    }
    return i;
  }));
};
  // 🔥 ELIMINAR PRODUCTO (opcional pero pro)
  const eliminarProducto = (id) => {
    setItems(items.filter(i => i.producto_id !== id));
  };

  // 🔥 TOTAL GENERAL
  const total = items.reduce(
    (acc, i) => acc + (i.cantidad * i.precio_unitario),
    0
  );

  // 🔥 CREAR VENTA
  const crearVenta = async () => {
    if (items.length === 0) {
      alert("Agrega al menos un producto");
      return false;
    }

    if (tipoPago === "credito" && !clienteId) {
      alert("⚠️ Selecciona un cliente");
      return false;
    }

    setLoading(true);

    try {
      await api.post("/ventas", {
        productos: items,
        tipo_pago: tipoPago,
        cliente_id: tipoPago === "credito" ? clienteId : null,
      });

      alert("Venta registrada ✅");

      // reset
      setItems([]);
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
    items,
    productoSeleccionado,
    tipoPago,
    total,
    loading,

    setTipoPago,
    setClienteId,

    seleccionarProducto,
    cambiarCantidad,
    eliminarProducto,
    crearVenta,
  };
};