import { useEffect, useState } from 'react';
import { formatPriceToCLP } from '../../utils/formattedPriceToClp'; // Importar la función de formateo

const PaymentSuccess = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenWs = params.get('token_ws');
    const productId = params.get('productId'); // Obtener el ID del producto de los parámetros de la URL

    if (tokenWs) {
      const fetchTransactionDetails = async () => {
        try {
          const response = await fetch(`/api/webpay/confirm`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: tokenWs }),
          });

          if (response.ok) {
            const data = await response.json();
            setDetails(data.details);
            setLoading(false);

            // Obtener los detalles del producto
            const productResponse = await fetch(`https://dummyjson.com/products/${productId}`);
            const productData = await productResponse.json();
            setProduct(productData);
          } else {
            const errorData = await response.json();
            setError(errorData.error);
            setLoading(false);
          }
        } catch (err) {
          console.error('Error al obtener los detalles de la transacción:', err);
          setError('Error al obtener los detalles de la transacción.');
          setLoading(false);
        }
      };

      fetchTransactionDetails();
    } else {
      setError('Token no encontrado en la URL.');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p className='text-[#d5d6c3]'>Cargando detalles...</p>;
  }

  if (error) {
    return <p className='text-[#d5d6c3]'>Error: {error}</p>;
  }

  // Formatear el precio en CLP
  const formattedPrice = product ? formatPriceToCLP(product.price) : '';

  return (
<div className="text-[#d5d6c3] p-8">
  <h1 className="text-4xl font-bold text-[#FF4655] mb-8 uppercase tracking-wide">
    ¡Pago Exitoso!
  </h1>

  {/* Detalles de la transacción */}
  {details ? (
    <div className="bg-[#0F1923] p-6 rounded-lg border border-gray-800 shadow-lg 
                    hover:shadow-red-500/40 transition-all duration-300">
      <p className="text-gray-300 mb-2">Gracias por tu compra. Aquí están los detalles de tu transacción:</p>
      <p className="text-lg"><strong className="text-[#FF4655]">Monto:</strong> {details.amount}</p>
      <p className="text-lg"><strong className="text-[#FF4655]">Número de Orden:</strong> {details.buy_order}</p>
      <p className="text-lg"><strong className="text-[#FF4655]">Fecha de la Transacción:</strong> {new Date(details.transaction_date).toLocaleString()}</p>
      <p className="text-lg"><strong className="text-[#FF4655]">Código de Autorización:</strong> {details.authorization_code}</p>
      <p className="text-lg"><strong className="text-[#FF4655]">Número de Tarjeta:</strong> **** **** **** {details.card_detail.card_number}</p>
    </div>
  ) : (
    <p className="text-lg text-gray-400">No se encontraron detalles de la transacción. 7w7</p>
  )}

  {/* Información del producto comprado */}
  {product && (
    <div className="bg-[#0F1923] p-6 rounded-xl border border-gray-800 
                    hover:border-[#FF4655] shadow-lg hover:shadow-red-500/40 
                    transition-all duration-300 mt-8">
      <h2 className="text-2xl font-semibold text-[#FF4655] mb-4">Detalles del Producto</h2>

      <div className="relative mb-4">
        <div className="absolute -inset-1 rounded-lg opacity-0 hover:opacity-40 
                        bg-gradient-to-r from-[#FF4655] to-pink-600 blur-md 
                        transition-opacity duration-300"></div>
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="w-full h-48 object-contain rounded-lg shadow-lg transition-transform duration-300 hover:scale-105" 
          loading="lazy"
        />
      </div>

      <p className="text-lg text-gray-300">{product.description}</p>
      <p className="text-2xl font-bold bg-gradient-to-r from-[#FF4655] to-pink-500 bg-clip-text text-transparent">
        {formattedPrice}
      </p>

      <div className="grid grid-cols-2 gap-4 text-gray-400 text-lg mt-4">
        <p><span className="text-[#FF4655]">Categoría:</span> {product.category}</p>
        <p><span className="text-[#FF4655]">Marca:</span> {product.brand}</p>
        <p><span className="text-[#FF4655]">Stock:</span> {product.stock}</p>
        <p><span className="text-[#FF4655]">Rating:</span> ⭐ {product.rating}</p>
      </div>
    </div>
  )}

  {/* Botón para volver */}
  <div className="mt-6 flex justify-center">
    <a href="/" className="bg-[#FF4655] hover:bg-[#d5d6c3] text-black hover:text-[#231f20] 
                          font-bold py-2 px-8 rounded-lg transition duration-300 ease-in-out 
                          border border-transparent hover:border-[#231f20]">
      VOLVER
    </a>
  </div>
</div>
  );
};

export default PaymentSuccess;
