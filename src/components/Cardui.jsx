import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function App() {
  // Estado para productos, categorías y errores
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  // Llamada a la API para obtener productos y categorías
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

  // Llamar a fetchData cuando el componente se monte
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {/* Si hay error, mostrar mensaje */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Mapear y mostrar los productos */}
      {products.map((item, index) => (
        <Card
          key={index}
          isPressable
          shadow="sm"
          onPress={() => console.log("item pressed")}
          className="bg-black text-white"
        >
          <CardBody className="overflow-visible">
            <Image
              alt={item.name}
              className="w-full object-cover h-[200px]"
              radius="lg"
              shadow="sm"
              src={item.image} // Asegúrate que cada producto tiene una propiedad 'img'
              width="100%"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.name}</b>
            <p className="text-gray-200">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
