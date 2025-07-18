import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardProducto({ producto }) {
  return (
    <Card className="h-100 bg-dark text-light shadow-sm">
      <Card.Img
        variant="top"
        src={producto.imagen}
        style={{ maxHeight: "200px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{producto.name}</Card.Title>
        <div className="mt-auto">
          <Link to={"/productos/" + producto.id}>
            <Button variant="info" className="w-100">
              Ver detalles del producto
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardProducto;
