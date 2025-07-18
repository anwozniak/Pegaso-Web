import { useEffect, useState } from "react";
import "../styles/Productos.css";
import Card from "./Card";
import Footer from "../components/Footer";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";

function ProductosContainerFirebase() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://68336f12464b499636ff711f.mockapi.io/productos")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setProductos(datos);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Hubo un problema al cargar los productos.");
        setCargando(false);
      });
  }, []);

  return (
    <>
      <Container className="my-5">
        <h2 className="text-center text-light mb-4">Nuestros Productos</h2>

        {cargando && (
          <div className="text-center my-5">
            <Spinner animation="border" variant="info" />
            <p className="text-light mt-3">Cargando productos...</p>
          </div>
        )}

        {error && <Alert variant="danger" className="text-center">{error}</Alert>}

        {!cargando && !error && (
          <Row xs={1} md={2} lg={4} className="g-4">
            {productos.map((producto) => (
              <Col key={producto.id}>
                <Card producto={producto} />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <Footer />
    </>
  );
}

export default ProductosContainerFirebase;


