import { useLocation } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function BuscarProductos() {
  const query = useQuery().get("query")?.toLowerCase() || "";
  const { productos, obtenerProductos } = useProductosContext();
  const [filtrados, setFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const buscar = async () => {
      if (productos.length === 0) {
        await obtenerProductos();
      }

      const resultados = productos.filter(
        (producto) =>
          producto.name.toLowerCase().includes(query) ||
          producto.description.toLowerCase().includes(query)
      );

      setFiltrados(resultados);
      setCargando(false);
    };

    buscar();
  }, [query, productos, obtenerProductos]);

  if (cargando) return <p className="text-center mt-4">Buscando productos...</p>;

  return (
    <Container className="my-4">
      <h3 className="mb-4">
        Resultados para: <strong>{query}</strong>
      </h3>
      {filtrados.length === 0 ? (
        <p>No se encontraron productos que coincidan.</p>
      ) : (
        <Row>
          {filtrados.map((producto) => (
            <Col md={4} key={producto.id} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={producto.imagen}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{producto.name}</Card.Title>
                  <Card.Text>{producto.description}</Card.Text>
                  <Button variant="primary">Ver más</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default BuscarProductos;
