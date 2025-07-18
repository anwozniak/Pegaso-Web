import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";
import Footer from "../components/Footer";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "../styles/Contacto.css";


function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.mensaje) {
      setError("Por favor, completá todos los campos.");
      return;
    }
    setError("");
    setEnviado(true);
  };

  return (
    <>
      <Container className="my-5">
        <h2 className="mb-4 text-center"></h2>
        <Card className="bg-dark text-light p-4 shadow">
          <Row className="gy-4">
            <Col xs={12} md={6} className="contact-left-section">
              <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}
                {enviado && <Alert variant="success">¡Mensaje enviado! Gracias.</Alert>}

                <Form.Group className="mb-3" controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    placeholder="Tu nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="contact-form-control"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="tu@correo.com"
                    value={form.email}
                    onChange={handleChange}
                    className="contact-form-control"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="mensaje">
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="mensaje"
                    placeholder="Escribí tu mensaje aquí..."
                    value={form.mensaje}
                    onChange={handleChange}
                    className="contact-form-control"
                  />
                </Form.Group>

                <Button variant="info" type="submit" className="w-100">
                  Enviar
                </Button>
              </Form>
            </Col>

            <Col xs={12} md={6} className="ps-md-4">
              <h4>Datos de contacto</h4>
              <p className="d-flex align-items-center mb-2">
                <FaPhone className="me-2 text-info" />
                <strong>Teléfono:</strong>&nbsp;+54 9 11 1234-5678
              </p>
              <p className="d-flex align-items-center mb-2">
                <FaEnvelope className="me-2 text-info" />
                <strong>Email:</strong>&nbsp;contacto@artesanias.com
              </p>
              <p className="d-flex align-items-center mb-2">
                <FaMapMarkerAlt className="me-2 text-info" />
                <strong>Dirección:</strong>&nbsp;Av. Artesanos 123, Buenos Aires, Argentina
              </p>

              <div className="ratio ratio-16x9 rounded shadow mt-3">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.915112458687!2d-58.38155968475976!3d-34.60368448045956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb165e07b6d7%3A0x702c8802ed50b7f3!2sPlaza%20de%20Mayo!5e0!3m2!1ses!2sar!4v1689876543210!5m2!1ses!2sar"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Mapa de ubicación"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>

      <Footer />
    </>
  );
}

export default Contacto;
