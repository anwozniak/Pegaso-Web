import { useEffect, useState } from "react";
import "../styles/Productos.css";
import { useProductosContext } from "../contexts/ProductosContext";
import { Helmet } from "react-helmet";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardProducto from "./Card";
import { FaSearch } from "react-icons/fa";
import Footer from "../components/Footer";

function ProductosContainer() {
  const { productos, obtenerProductos, filtrarProductos } = useProductosContext();

  const productosPorPagina = 8;
  const [paginaActual, setPaginaActual] = useState(1);

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    obtenerProductos()
      .then(() => {
        setCargando(false);
      })
      .catch(() => {
        setError("Hubo un problema al cargar los productos.");
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    filtrarProductos(filtro);
    setPaginaActual(1); 
  }, [filtro]);

  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const cambiarPagina = (numeroPagina) => {
    if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
      setPaginaActual(numeroPagina);
    }
  };

  if (cargando) return <p className="text-center my-5">Cargando productos...</p>;
  if (error) return <p className="text-center text-danger my-5">{error}</p>;

  return (
    <div>
    <div className="container py-4">
      <Helmet>
        <title>Productos | Tienda Pegaso</title>
        <meta name="description" content="Explora nuestra variedad de productos." />
      </Helmet>

      <div className="input-group mb-4 mt-3">
        <span className="input-group-text">
          <FaSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar productos..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      <Row xs={1} md={2} lg={4} className="g-4">
        {productosActuales.length > 0 ? (
          productosActuales.map((producto) => (
            <Col key={producto.id}>
              <CardProducto producto={producto} />
            </Col>
          ))
        ) : (
          <p className="text-center text-muted">No se encontraron productos.</p>
        )}
      </Row>

      {totalPaginas > 1 && (
        <div className="d-flex justify-content-center align-items-center my-4 flex-wrap gap-2 paginacion">
          <button
            className="btn btn-outline-info text-light bg-dark"
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            ← Anterior
          </button>

          {Array.from({ length: totalPaginas }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => cambiarPagina(index + 1)}
              className={`btn ${
                paginaActual === index + 1
                  ? "btn-info text-white ": "btn-outline-info text-light bg-dark"
              } paginacion-numero`}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="btn btn-outline-info text-light bg-dark"
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente →
          </button>
        </div>
      )}
      </div>
      <Footer />
    </div>
  );
}

export default ProductosContainer;

