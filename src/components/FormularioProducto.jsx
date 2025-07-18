import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { dispararSweetBasico } from '../assets/SweetAlert';
import { useAuthContext } from '../contexts/AuthContext';
import { useProductosContext } from '../contexts/ProductosContext';
import Footer from "../components/Footer";

function FormularioProducto() {
  const { agregarProducto } = useProductosContext();
  const { admin } = useAuthContext();

  const [producto, setProducto] = useState({
    name: '',
    price: '',
    description: '',
    imagen: ''
  });

  if (!admin) return <Navigate to="/login" replace />;

  const validarFormulario = () => {
    if (!producto.name.trim()) return "El nombre es obligatorio.";
    if (!producto.price || producto.price <= 0) return "El precio debe ser mayor a 0.";
    if (!producto.description.trim() || producto.description.length < 10)
      return "La descripción debe tener al menos 10 caracteres.";
    if (!producto.imagen.trim()) return "La URL de la imagen no debe estar vacía.";
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validacion = validarFormulario();
    if (validacion === true) {
      try {
        await agregarProducto(producto);
        setProducto({ name: '', price: '', description: '', imagen: '' });
        dispararSweetBasico("Producto agregado", "El producto fue agregado correctamente", "success", "Cerrar");
      } catch (error) {
        dispararSweetBasico("Error al agregar", error.message, "error", "Cerrar");
      }
    } else {
      dispararSweetBasico("Error en el formulario", validacion, "error", "Cerrar");
    }
  };

  return (
    <>
      <Container className="my-5">
        <Card className="bg-dark text-light p-4 shadow mx-auto" style={{ maxWidth: "600px" }}>
          <h3 className="text-center mb-4">Agregar Producto</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={producto.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                value={producto.imagen}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={producto.price}
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
                value={producto.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="info" type="submit">
                Agregar Producto
              </Button>
            </div>
          </Form>
        </Card>
      </Container>

      <Footer />
    </>
  );
}

export default FormularioProducto;

  