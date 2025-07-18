import "../styles/Carrito.css";
import { useContext } from "react";
import CarritoCard from "./CarritoCard.jsx";
import { Navigate } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext.jsx";
import { useAuthContext } from "../contexts/AuthContext.jsx";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

export default function Carrito() {
  const { user } = useAuthContext();
  const { productosCarrito, vaciarCarrito, borrarProductoCarrito } = useContext(CarritoContext);

  const total = productosCarrito.reduce(
    (subTotal, producto) => subTotal + producto.price * producto.cantidad,
    0
  );

  function funcionDisparadora(id) {
    borrarProductoCarrito(id);
  }

  function funcionDisparadora2() {
    vaciarCarrito();
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Container className="my-5">
        <Card className="bg-dark text-light p-4 shadow">
          <h3 className="text-center mb-4">Tu Carrito</h3>

          {productosCarrito.length === 0 ? (
            <p className="text-center">El carrito está vacío.</p>
          ) : (
            <>
              <Row className="text-info fw-bold text-center border-bottom pb-2 mb-3">
                <Col xs={12} md={2}>Producto</Col>
                <Col xs={12} md={3}>Descripción</Col>
                <Col xs={12} md={1}>Cantidad</Col>
                <Col xs={12} md={2}>Precio</Col>
                <Col xs={12} md={2}>Subtotal</Col>
                <Col xs={12} md={2}>Acción</Col>
              </Row>

              {productosCarrito.map((producto) => (
                <CarritoCard
                  key={producto.id}
                  producto={producto}
                  funcionDisparadora={funcionDisparadora}
                />
              ))}

              <div className="text-end mt-4">
                <h5>Total a pagar: <span className="text-info">${total.toFixed(2)}</span></h5>
              </div>

              <div className="d-flex justify-content-between mt-3">
                <Button variant="outline-light" onClick={funcionDisparadora2}>
                  Vaciar carrito
                </Button>
                <Button variant="info" disabled={total === 0}>
                  Finalizar compra
                </Button>
              </div>
            </>
          )}
        </Card>
      </Container>
    </>
  );
}
