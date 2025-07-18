import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { crearUsuario, loginEmailPass } from '../auth/firebase';
import { dispararSweetBasico } from '../assets/SweetAlert';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import Footer from "../components/Footer";
import "../styles/Contacto.css"; 

function Login2() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const { login, user, logout, admin } = useAuthContext();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const iniciarSesionEmailPass = (e) => {
    e.preventDefault();
    loginEmailPass(usuario, password)
      .then(() => {
        login(usuario);
        dispararSweetBasico("Logeo exitoso", "", "success", "Confirmar");
        navigate("/");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          dispararSweetBasico("Credenciales incorrectas", "", "error", "Cerrar");
        }
      });
  };

  const registrarUsuario = (e) => {
    e.preventDefault();
    crearUsuario(usuario, password)
      .then(() => {
        login(usuario);
        dispararSweetBasico("Registro exitoso", "", "success", "Confirmar");
        navigate("/");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          dispararSweetBasico("Credenciales incorrectas", "", "error", "Cerrar");
        } else if (error.code === "auth/weak-password") {
          dispararSweetBasico("Contraseña débil", "Debe tener al menos 6 caracteres", "error", "Cerrar");
        }
      });
  };

  const toggleShow = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <>
      <Container className="my-5">
        <Card className="bg-dark text-light p-4 shadow mx-auto" style={{ maxWidth: '500px' }}>
          {user || admin ? (
            <>
              <h3 className="mb-4 text-center">Cerrar sesión</h3>
              <Form onSubmit={handleLogout}>
                <Button type="submit" variant="info" className="w-100">
                  Cerrar sesión
                </Button>
              </Form>
            </>
          ) : show ? (
            <>
              <h3 className="mb-4 text-center">Iniciar sesión</h3>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={iniciarSesionEmailPass}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="tu@correo.com"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    className="contact-form-control"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="contact-form-control"
                  />
                </Form.Group>

                <Button variant="info" type="submit" className="w-100">
                  Iniciar sesión
                </Button>
              </Form>

              <div className="text-center mt-3">
                <Button variant="link" className="text-info" onClick={toggleShow}>
                  ¿No tenés cuenta? Registrate
                </Button>
              </div>
            </>
          ) : (
            <>
              <h3 className="mb-4 text-center">Registrarse</h3>
              <Form onSubmit={registrarUsuario}>
                <Form.Group className="mb-3" controlId="formEmailRegister">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="tu@correo.com"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    className="contact-form-control"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPasswordRegister">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="contact-form-control"
                  />
                </Form.Group>

                <Button variant="info" type="submit" className="w-100">
                  Registrarse
                </Button>
              </Form>

              <div className="text-center mt-3">
                <Button variant="link" className="text-info" onClick={toggleShow}>
                  ¿Ya tenés cuenta? Iniciar sesión
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

export default Login2;
