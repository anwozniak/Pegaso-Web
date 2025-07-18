import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Container, Row, Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { CarritoContext } from "../contexts/CarritoContext";
import { AuthContext } from "../contexts/AuthContext.jsx";
import CarritoCardBootstrap from "./CarritoCardBootstrap";
import Footer from "../components/Footer";

function CarritoBootstrap() {
  const { user } = useContext(AuthContext);
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

  async function comprar() {
    const result = await Swal.fire({
      title: '¿Confirmar compra?',
      text: `El total a pagar es $${total.toFixed(2)}. ¿Deseas finalizar la compra?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, comprar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      vaciarCarrito();
      Swal.fire(
        'Compra realizada',
        'Gracias por tu compra.',
        'success'
      );
    }
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Container className="my-5">
        <Card className="bg-dark text-light p-4 shadow">
          <h3 className="text-center mb-4">Carrito de Compras</h3>

          {productosCarrito.length === 0 ? (
            <p className="text-center">El carrito está vacío.</p>
          ) : (
            <>
              <Row xs={1} className="mb-3">
                {productosCarrito.map((producto) => (
                  <CarritoCardBootstrap
                    key={producto.id}
                    producto={producto}
                    funcionDisparadora={funcionDisparadora}
                  />
                ))}
              </Row>

              <div className="d-flex justify-content-between align-items-center mt-4">
                <Button variant="outline-light" onClick={funcionDisparadora2}>
                  Vaciar carrito
                </Button>

                <h5 className="mb-0">
                  Total a pagar: <span className="text-info">${total.toFixed(2)}</span>
                </h5>

                <Button variant="success" onClick={comprar}>
                  Comprar
                </Button>
              </div>
            </>
          )}
        </Card>
      </Container>

      <Footer />
    </>
  );
}

export default CarritoBootstrap;
