import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaBoxOpen,
  FaUsers,
  FaPhone,
  FaSignInAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-light pt-4 pb-3 mt-5">
      <Container>
        <Row className="align-items-center">

          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <img
              src={logo}
              alt="Logo"
              height="40"
              className="d-inline-block align-middle me-2"
            />
          </Col>

          {/* Enlaces rápidos */}
          <Col md={4} className="text-center mb-3 mb-md-0">
            <ul className="list-unstyled d-flex flex-column flex-md-row justify-content-center gap-3 mb-0">
              <li>
                <Link to="/productos" className="text-light text-decoration-none">
                  <FaBoxOpen className="me-1" /> Productos
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-light text-decoration-none">
                  <FaUsers className="me-1" /> Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-light text-decoration-none">
                  <FaPhone className="me-1" /> Contacto
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-light text-decoration-none">
                  <FaSignInAlt className="me-1" /> Login
                </Link>
              </li>
            </ul>
          </Col>

          {/* Redes sociales */}
          <Col md={4} className="text-center text-md-end">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light me-3"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light me-3"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://wa.me/5491123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light"
            >
              <FaWhatsapp size={20} />
            </a>
          </Col>
        </Row>

        <hr className="border-light my-3" />
        <Row>
          <Col className="text-center">
            <small>&copy; 2025 Artesanías Pegaso. Todos los derechos reservados.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
