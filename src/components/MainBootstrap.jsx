import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import { FaShippingFast, FaRecycle, FaAward, FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";

function MainBootstrap() {
  const { productos, obtenerProductos } = useProductosContext();
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (productos.length === 0) {
      obtenerProductos().then(() => setCargando(false));
    } else {
      setCargando(false);
    }
  }, []);

  const destacados = productos.slice(0, 3);

  const opiniones = [
    {
      nombre: "María González",
      texto: "El mate es hermoso, llegó bien protegido y en tiempo. ¡Recomendadísimo!",
      imagen: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
    },
    {
      nombre: "Luis Rodríguez",
      texto: "El cuchillo artesanal es una joya. ¡Un lujo argentino!",
      imagen: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4,
    },
    {
      nombre: "Ana Martínez",
      texto: "Compré un yerbero para regalar y fue un éxito. Muy buen trabajo artesanal.",
      imagen: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
    },
  ];

  return (
    <>
    
      <Container className="my-5">
        <Row className="align-items-center">
          <Col xs={12} md={5} lg={4}>
            <Image
              src="https://d22fxaf9t8d39k.cloudfront.net/b31501c667daa8f66078570024befb89dd25a7634fabad9d4d59a6cf5ef63ba419762.jpeg"
              alt="Mate artesanal"
              fluid
              rounded
            />
          </Col>
          <Col xs={12} md={7} lg={8}>
            <h2 className="mb-3">Artesanías que cuentan historias</h2>
            <p>
              Nuestra colección incluye mates, bombillas, cuchillos, yerberos y más,
              elaborados por manos artesanas que combinan tradición y calidad.
            </p>
            <Button as={Link} to="/productos" variant="dark">
              Ir a productos
            </Button>
          </Col>
        </Row>
      </Container>

      
      <Container className="my-5">
        <h3 className="text-center mb-4">Productos destacados</h3>
        <Row>
          {cargando ? (
            <p>Cargando productos...</p>
          ) : (
            destacados.map((producto) => (
              <Col md={4} key={producto.id} className="mb-4">
                <Card className="h-100 bg-dark text-light shadow-sm">
                  <Card.Img variant="top" src={producto.imagen} style={{ objectFit: "cover", maxHeight: "200px" }} />
                  <Card.Body>
                    <Card.Title>{producto.name}</Card.Title>
                    <Card.Text>{producto.description}</Card.Text>
                    <Button as={Link} to={`/producto/${producto.id}`} variant="info" className="w-100">
                      Ver más
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>

      
      <Container className="my-5">
        <h3 className="text-center mb-4">Lo que dicen nuestros clientes</h3>
        <Row className="gy-4">
          {opiniones.map(({ nombre, texto, imagen, rating }, idx) => (
            <Col md={4} key={idx}>
              <Card className="custom-card h-100 bg-dark text-light text-center">
                <Card.Body>
                  <FaQuoteLeft className="mb-2 text-info" size={25} />
                  <Image src={imagen} roundedCircle width={80} height={80} className="mb-3" />
                  <Card.Text className="fst-italic">"{texto}"</Card.Text>
                  <div className="my-2 text-warning">
                    {Array(rating).fill(0).map((_, i) => <FaStar key={i} />)}
                  </div>
                  <FaQuoteRight className="mt-2 text-info" size={25} />
                </Card.Body>
                <Card.Footer className="bg-transparent border-0 text-end">
                  — <strong>{nombre}</strong>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

     
        <h3 className="text-center mb-4">¿Por qué elegirnos?</h3>
      
          
        

<Row className="mb-5 text-center">
          <Col md={4} className="mb-4 mb-md-0">
            <FaShippingFast size={40} className="mb-3 text-info" />
            <h5>Envíos a todo el país</h5>
            <p>Enviamos tus compras rápido y con seguimiento a donde estés.</p>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <FaAward size={40} className="mb-3 text-info" />
            <h5>Calidad garantizada</h5>
            <p>Artesanías seleccionadas con altos estándares de fabricación.</p>
          </Col>
          <Col md={4}>
            <FaRecycle size={40} className="mb-3 text-info" />
            <h5>Devoluciones simples</h5>
            <p>Si no estás conforme, podés devolver o cambiar sin complicaciones.</p>
          </Col>
        </Row>






      {/* CTA Final */}
      <Container className="my-5 text-center">
        <h4>¿Listo para descubrir el arte argentino?</h4>
        <p>Conocé nuestras colecciones y llevá a tu hogar piezas únicas con historia.</p>
        <Button as={Link} to="/productos" variant="dark">
          Ir a productos
        </Button>
      </Container>
    </>
  );
}

export default MainBootstrap;

