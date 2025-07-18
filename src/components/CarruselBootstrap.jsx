import { Carousel, Container } from "react-bootstrap";

function CarruselBootstrap() {
  const productos = [
    {
      id: 1,
      name: "Mate de calabaza",
      description: "Clásico y artesanal, con virola de aluminio.",
      imagen:
        "https://static.wixstatic.com/media/0b11c1_3a58e4e3c2a941deaa8a27b3094f1d9c~mv2.jpg/v1/fill/w_740,h_740,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0b11c1_3a58e4e3c2a941deaa8a27b3094f1d9c~mv2.jpg",
    },
    {
      id: 2,
      name: "Cuchillo criollo",
      description: "Cuchillo hecho a mano con cabo de asta.",
      imagen:
        "https://i0.wp.com/lucianostarna.com/wp-content/uploads/2023/03/DSC_0042.jpg?fit=1440%2C1079&ssl=1",
    },
    {
      id: 3,
      name: "Bombilla de acero",
      description: "Diseño clásico y resistente.",
      imagen:
        "https://acdn-us.mitiendanube.com/stores/545/007/products/bombilla-acero-resorte-img_605611-382da1a69d59e44e4815846590914675-1024-1024.webp",
    },
  ];

  return (
    <Container className="my-4">
      <Carousel>
        {productos.map((producto) => (
          <Carousel.Item key={producto.id}>
            <img
              className="d-block w-100"
              src={producto.imagen}
              alt={producto.name}
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3>{producto.name}</h3>
              <p>{producto.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default CarruselBootstrap;

