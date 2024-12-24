import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { jwtDecode } from 'jwt-decode';

const ListStore = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    name: '',
    brand: ''
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const itemsPerPage = 6;

  // Fetch products on initial load
  useEffect(() => {
    fetchProducts();
    if (token) {
      checkAdmin(token); // Llamar a la función para verificar si es admin con el token
    }
  }, [token]);

  // Apply filters when products or filters change
  useEffect(() => {
    filterProducts();
  }, [products, filters]);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://nodejs-eshop-api-course-2c70.onrender.com/api/v1/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Check if the user is an admin based on the JWT token
  const checkAdmin = (token) => {
    try {
      const decoded = jwtDecode(token);  // Decodificamos el token
      setIsAdmin(decoded.isAdmin);  // Establecemos el estado isAdmin
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  // Filter products based on name and brand
  const filterProducts = () => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      product.brand.toLowerCase().includes(filters.brand.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = async (productId) => {
    if (!isAdmin) {
      alert('No tienes permisos para eliminar este producto.');
      return;
    }

    const token = document.cookie.replace('token=', '');  // Obtener token desde las cookies
    try {
      const res = await fetch(`https://nodejs-eshop-api-course-2c70.onrender.com/api/v1/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        alert('Producto eliminado con éxito');
        setProducts(products.filter(product => product._id !== productId));
      } else {
        const data = await res.json();
        alert(`Error eliminando el producto: ${data.message}`);
      }
    } catch (error) {
      console.error('Error eliminando el producto:', error);
    }
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const productsOnPage = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <form className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre del producto"
            value={filters.name}
            onChange={handleFilterChange}
            className="p-2 bg-valorant-dark text-valorant rounded"
          />
          <input
            type="text"
            name="brand"
            placeholder="Marca"
            value={filters.brand}
            onChange={handleFilterChange}
            className="p-2 bg-valorant-dark text-valorant rounded"
          />
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productsOnPage.length === 0 ? (
          <p className="text-red-500">No se encontraron productos.</p>
        ) : (
          productsOnPage.map((product) => (
            <div key={product._id} className="bg-valorant-dark p-4 rounded-lg shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" loading="lazy" />
              <h2 className="text-2xl font-semibold text-valorant mb-2">{product.name}</h2>
              <p className="text-lg">Marca: {product.brand}</p>
              <p className="text-lg">Precio: {product.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
              <p className="text-lg">Calificación: {product.rating}</p>
              <p className="text-lg">Stock: {product.countInStock}</p>
              <p className="text-lg">Descripción: {product.description}</p>
              <p className="text-lg">Categoría: {product.category.name}</p>
              <p className='text-lg'>id:{product._id}</p>

              {isAdmin && (
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white py-1 px-4 rounded mt-4"
                >
                  Eliminar
                </button>
              )}
            </div>
          ))
        )}
      </div>

      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
};
export default ListStore;
