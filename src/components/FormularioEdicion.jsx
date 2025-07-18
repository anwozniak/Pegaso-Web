import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import { Container, Form, Button, Spinner, Alert, Card } from "react-bootstrap";

function FormularioEdicion() {
  const { admin } = useAuthContext();
  const { obtenerProducto, productoEncontrado, editarProducto } = useProductosContext();
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  if (!admin) return <Navigate to="/login" replace />;

  useEffect(() => {
    obtenerProducto(id)
      .then(() => {
        setProducto(productoEncontrado);
        setCargando(false);
      })
      .catch((error) => {
        if (error === "Producto no encontrado") {
          setError("Producto no encontrado");
        } else {
          setError("Hubo un error al obtener el producto.");
        }
        setCargando(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    if (!producto.name?.trim()) return "El nombre es obligatorio.";
    if (!producto.price || producto.price <= 0) return "El precio debe ser mayor a 0.";
    if (!producto.description?.trim() || producto.description.length < 10)
      return "La descripción debe tener al menos 10 caracteres.";
    if (!producto.imagen?.trim()) return "La URL de la imagen no debe estar vacía.";
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validacion = validarFormulario();
    if (validacion === true) {
      editarProducto(producto)
        .then(() => {
          toast.success("Producto editado correctamente!");
        })
        .catch((error) => {
          toast.error("Hubo un problema al actualizar el producto. " + error.message);
        });
    } else {
      Swal.fire("Error en la carga", validacion, "error");
    }
  };

  if (cargando) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="light" />
        <p className="mt-3 text-light">Cargando producto...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Container className="my-5">
        <Card className="bg-dark text-light p-4 shadow">
          <h3 className="text-center mb-4">Editar Producto</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={producto.name || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Imagen URL</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                value={producto.imagen || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={producto.price || ""}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={producto.description || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/admin" className="btn btn-outline-light">
                Cancelar
              </Link>
              <Button variant="info" type="submit">
                Actualizar Producto
              </Button>
            </div>
          </Form>
          <ToastContainer />
        </Card>
      </Container>

      <Footer />
    </>
  );
}

export default FormularioEdicion;
