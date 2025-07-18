import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Col, Row } from "react-bootstrap";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";
import Footer from "../components/Footer";
import "../styles/ProductoDetalle.css";

function ProductoDetalleBootstrap() {
  const navegar = useNavigate();
  const { admin } = useAuthContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { productoEncontrado, obtenerProducto, eliminarProducto } = useProductosContext();
  const { id } = useParams();

  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProducto(id)
      .then(() => setCargando(false))
      .catch((error) => {
        if (error === "Producto no encontrado") setError("Producto no encontrado");
        else setError("Hubo un error al obtener el producto.");
        setCargando(false);
      });
  }, [id]);

  const funcionCarrito = () => {
    if (cantidad < 1) return;
    agregarAlCarrito({ ...productoEncontrado, cantidad });
    dispararSweetBasico(
      "Producto Agregado",
      "El producto fue agregado al carrito con éxito",
      "success",
      "Cerrar"
    );
  };

  const dispararEliminar = () => {
    eliminarProducto(id)
      .then(() => navegar("/productos"))
      .catch((error) => {
        dispararSweetBasico("Error al eliminar", error, "error", "Cerrar");
      });
  };

  const sumarContador = () => setCantidad(cantidad + 1);
  const restarContador = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  if (cargando) return <p className="text-center mt-5">Cargando producto...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  if (!productoEncontrado) return null;

  return (
    <>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="bg-dark text-light p-4 rounded shadow text-center">
              <img
                className="img-fluid rounded mb-4"
                src={productoEncontrado.imagen}
                alt={productoEncontrado.name}
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />

              <h2 className="mb-3">{productoEncontrado.name}</h2>
              <p className="mb-2">{productoEncontrado.description}</p>
              <h4 className="text-info mb-4">${productoEncontrado.price}</h4>

              <div className="d-flex justify-content-center align-items-center mb-3">
                <Button variant="outline-light" onClick={restarContador}>-</Button>
                <span className="mx-3 fs-5">{cantidad}</span>
                <Button variant="outline-light" onClick={sumarContador}>+</Button>
              </div>

              {admin ? (
                <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
                  <Link to={`/admin/editarProducto/${id}`}>
                    <Button variant="info">Editar</Button>
                  </Link>
                  <Button variant="danger" onClick={dispararEliminar}>Eliminar</Button>
                </div>
              ) : (
                <Button variant="info" onClick={funcionCarrito}>
                  Agregar al carrito
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default ProductoDetalleBootstrap;

