//src/components/store/ProductDetail.jsx
import { useState, useEffect } from "react";
import { formatPriceToCLP } from "../../utils/formattedPriceToClp";

const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      console.log("ID del producto recibido:", productId);

      setIsLoading(true);

      try {
        const response = await fetch(
          `https://nodejs-eshop-api-course-2c70.onrender.com/api/v1/products/${productId}`
        );
        const data = await response.json();

        console.log("Producto recibido de la API:", data);

        if (!response.ok) {
          throw new Error(data.message || "Error al cargar el producto");
        }

        setProduct(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error al cargar el producto");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  return (
    <div className="space-y-8 bg-valorant-dark min-h-screen p-8">
    <h1 class="text-4xl font-bold text-valorant mb-8">Detalle de <span className="text-4xl">{product.name}</span> </h1>

      <a
        href="/node/store"
        className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200 mb-4 inline-block"
      >
        Volver a Inicio
      </a>

      {isLoading ? (
        <div className="text-white flex justify-center items-center min-h-screen">
          <p>Cargando producto...</p>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : product ? (
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 md:flex">
          <div className="md:w-1/2">
            <img
              src={product.image || "https://via.placeholder.com/150"}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg mb-4 md:mb-0"
            />
          </div>
          <div className="md:w-1/2 md:pl-6">
            <h3 className="text-3xl font-semibold mb-4 text-valorant">{product.name}</h3>
            <p className="text-gray-400 text-lg mb-4">{product.description}</p>
            <p className="text-lg font-bold mb-4">{formatPriceToCLP(product.price)}</p>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Rating:</span>
                <span className="text-valorant">{product.rating}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Reseñas:</span>
                <span className="text-valorant">{product.numReviews}</span>
              </div>
            </div>
            <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200">
              Añadir al Carrito
            </button>
          </div>
        </div>
      ) : (
        <p className="text-white">Producto no encontrado.</p>
      )}
    </div>
  );
};

export default ProductDetail;
