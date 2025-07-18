import { Container, Row, Col, Card } from "react-bootstrap";
import Footer from "../components/Footer";
import { FaQuoteLeft, FaQuoteRight, FaLeaf, FaHandSparkles, FaRecycle } from "react-icons/fa";
import "../styles/About.css";

function Nosotros() {
  const testimonios = [
    {
      nombre: "María López",
      texto: "Los regalos personalizados de Artesanías Pegaso hicieron que nuestros clientes se sintieran realmente especiales. ¡Calidad y detalle inigualables!",
    },
    {
      nombre: "Jorge Fernández",
      texto: "Me encantó el compromiso con lo sustentable y local. Además, el equipo fue súper atento en todo el proceso.",
    },
    {
      nombre: "Lucía Gómez",
      texto: "Un regalo con identidad, hecho con cariño. Recomiendo Artesanías Pegaso para cualquier evento corporativo.",
    },
  ];

  return (
    <>
      <Container className="my-5 ">
        <h2 className="mb-4 text-center"></h2>

        <Row className="mb-5 align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              alt="Artesanías Pegaso"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "350px", objectFit: "cover", width: "100%" }}
            />
          </Col>
          <Col md={6}>
            <p><h2 className="mb-4 text-center">Sobre Nosotros</h2>
              En <strong>Artesanías Pegaso</strong>, somos una pyme familiar dedicada a la
              creación de regalos empresariales personalizados y artesanías
              únicas, pensadas para dejar huella. Desde el corazón de Zona Oeste
              del Gran Buenos Aires, trabajamos con pasión y compromiso, combinando diseño,
              creatividad y dedicación artesanal en cada uno de nuestros productos.
            </p>
            <p>
              Nuestro proyecto nació con el objetivo de ofrecer una alternativa distinta a los
              regalos impersonales y genéricos del mercado. Creemos en los detalles, en lo hecho
              a mano, en el valor de lo auténtico.
            </p>
          </Col>
        </Row>

        <Row className="mb-5 text-center">
          <Col md={4} className="mb-4 mb-md-0">
            <FaHandSparkles size={40} className="mb-3 text-info" />
            <h5>Hecho a mano</h5>
            <p>Cada pieza elaborada con dedicación y materiales de calidad.</p>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <FaRecycle size={40} className="mb-3 text-info" />
            <h5>Sustentabilidad</h5>
            <p>Apoyamos la economía circular y materiales ecológicos.</p>
          </Col>
          <Col md={4}>
            <FaLeaf size={40} className="mb-3 text-info" />
            <h5>Producción local</h5>
            <p>Impulsamos emprendedores y productos de nuestra región.</p>
          </Col>
        </Row>

        <h3 className="mb-4 text-center"  >Lo que dicen nuestros clientes</h3>
        <Row className="gy-4">
          {testimonios.map(({ nombre, texto }, idx) => (
            <Col md={4} key={idx}>
              <Card className="custom-card h-100 bg-dark text-light">
                <Card.Body className="d-flex flex-column justify-content-center">
                  <FaQuoteLeft className="mb-3 text-info" size={30} />
                  <Card.Text className="fst-italic">"{texto}"</Card.Text>
                  <FaQuoteRight className="mt-3 ms-auto text-info" size={30} />
                  <Card.Footer className="border-0 bg-transparent text-end pt-3">
                    — <strong>{nombre}</strong>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <p className="mt-5 text-center">
          Gracias por apoyar lo hecho a mano, lo local y lo que nace con amor.<br />
          <strong>Artesanías Pegaso:</strong> donde cada regalo tiene una historia.
        </p>
      </Container>

      <Footer />
    </>
  );
}

export default Nosotros;
