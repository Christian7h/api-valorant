import { useState, useEffect } from "react";
import Pagination from "../Pagination";

const ListStore = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    name: "",
    brand: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch productos
        const productsResponse = await fetch(
          "https://nodejs-eshop-api-course-2c70.onrender.com/api/v1/products"
        );
        if (!productsResponse.ok) throw new Error("Error cargando productos");
        const productsData = await productsResponse.json();
        setProducts(productsData);

        // Fetch categorías
        const categoriesResponse = await fetch(
          "https://nodejs-eshop-api-course-2c70.onrender.com/api/v1/categories"
        );
        if (!categoriesResponse.ok)
          throw new Error("Error cargando categorías");
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error al cargar datos");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, filters]);

  const filterProducts = () => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        product.brand.toLowerCase().includes(filters.brand.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const productsOnPage = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8">
      {error && <p className="text-red-500">{error}</p>}

      {/* Mostrar Categorías */}
      <div>
        <h2 className="text-3xl font-bold text-valorant mb-4">Categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <a
              key={category._id}
              href={`/node/category/${category._id}`}
              className="bg-gray-800 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
            >
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <p className="text-sm text-gray-400">{category.description}</p>
              <p className="text-sm text-gray-400">{category._id}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-gray-900 p-4 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-white mb-4">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Buscar por nombre"
            value={filters.name}
            onChange={handleFilterChange}
            className="p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
          />
          <input
            type="text"
            name="brand"
            placeholder="Buscar por marca"
            value={filters.brand}
            onChange={handleFilterChange}
            className="p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
          />
        </div>
      </div>
      {/* Mostrar Productos */}
      <div>
        <h2 className="text-3xl font-bold text-valorant mb-4">Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((product) => (
            <div
              key={product._id}
              className="bg-gray-800 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200"
            >
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-4">
                {product.description}
              </p>
              <p className="text-lg font-bold mb-2">
                ${product.price.toFixed(2)}
              </p>
              <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200">
                Añadir al Carrito
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-24">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ListStore;
