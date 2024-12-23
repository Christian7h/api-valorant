import { useEffect, useState } from 'react';
import Pagination from './Pagination';

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    name: '',
    brand: ''
  });
  const itemsPerPage = 6;

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, filters]);
  
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://nodejs-eshop-api-course-2c70.onrender.com/api/v1/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filterProducts = () => {
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      product.brand.toLowerCase().includes(filters.brand.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const productsOnPage = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      {/* Formulario de filtros */}
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

      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productsOnPage.length === 0 ? (
          <p className="text-red-500">No se encontraron productos.</p>
        ) : (
          productsOnPage.map((product) => (
            <div key={product._id} className="bg-valorant-dark p-4 rounded-lg shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" loading="lazy" />
              <h2 className="text-2xl font-semibold text-valorant mb-2">{product.name}</h2>
              <p className="text-lg">Marca: {product.brand}</p>
              <p className="text-lg">Precio: ${product.price.toFixed(2)}</p>
              <p className="text-lg">Calificación: {product.rating}</p>
              <p className="text-lg">Stock: {product.countInStock}</p>
              <p className="text-lg">Descripción: {product.description}</p>
              <p className="text-lg">Categoría: {product.category.name}</p>
            </div>
          ))
        )}
      </div>
      
      {/* Componente de paginación */}
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
};

export default ListProducts;
