import { useNavigate } from "react-router-dom";

const ItemProducto = ({ producto }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/producto/${producto.id}`)}
      style={{
        borderBottom: "1px solid #ccc",
        padding: "10px",
        cursor: "pointer",
      }}
    >
      <strong>{producto.nombre}</strong>

      <p>
        Stock: {producto.stock} {producto.unidad}
      </p>

      <p>
        Precio base: ${producto.precio_base}
      </p>
    </div>
  );
};

export default ItemProducto;