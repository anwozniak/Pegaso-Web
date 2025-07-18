import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import {
  Navbar,
  Nav,
  Container,
  Badge,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import {
  FaShoppingCart,
  FaBoxOpen,
  FaUsers,
  FaPhone,
  FaSearch,
  FaUserShield,
  FaPlusCircle,
  FaSignInAlt,
} from "react-icons/fa";

function NavBootstrap() {
  const { productosCarrito } = useContext(CarritoContext);
  const { admin } = useAuthContext();

  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const manejarBusqueda = (e) => {
    e.preventDefault();
    if (busqueda.trim()) {
      navigate(`/buscar?query=${encodeURIComponent(busqueda)}`);
      setBusqueda("");
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
       <Navbar.Brand as={Link} to="/">
  <img
    src={logo}
    alt="Logo"
    height="40"
    className="d-inline-block align-top"
  />
</Navbar.Brand>

        <Navbar.Toggle aria-controls="nav-principal" />
        <Navbar.Collapse id="nav-principal">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/productos">
              <FaBoxOpen className="me-1" /> Productos
            </Nav.Link>
            <Nav.Link as={Link} to="/nosotros">
              <FaUsers className="me-1" /> Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto">
              <FaPhone className="me-1" /> Contacto
            </Nav.Link>
            {admin && (
              <>
                <Nav.Link as={Link} to="/admin">
                  <FaUserShield className="me-1" /> Admin
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/agregarProductos">
                  <FaPlusCircle className="me-1" /> Agregar
                </Nav.Link>
              </>
            )}
          </Nav>

          
          <Form className="d-flex me-3" onSubmit={manejarBusqueda}>
            <FormControl
              type="search"
              placeholder="Buscar..."
              className="me-2"
              aria-label="Buscar"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <Button variant="outline-light" type="submit">
              <FaSearch />
            </Button>
          </Form>

          
          <Nav>
            <Nav.Link as={Link} to="/carrito">
              <FaShoppingCart />
              {productosCarrito.length > 0 && (
                <Badge bg="light" text="dark" className="ms-1">
                  {productosCarrito.length}
                </Badge>
              )}
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              <FaSignInAlt className="me-1" /> Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBootstrap;
