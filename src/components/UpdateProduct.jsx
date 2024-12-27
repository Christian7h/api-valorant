// src/components/UpdateProduct.jsx

import { useState, useEffect } from 'react';

const UpdateProduct = ({ id, token }) => {
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [richDescription, setRichDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [rating, setRating] = useState('');
  const [numReviews, setNumReviews] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://nodejs-eshop-api-course-2c70.onrender.com/api/v1/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
          setName(data.name);
          setDescription(data.description);
          setRichDescription(data.richDescription);
          setBrand(data.brand);
          setPrice(data.price);
          setCategory(data.category._id); // Assuming the category is an object with _id
          setCountInStock(data.countInStock);
          setRating(data.rating);
          setNumReviews(data.numReviews);
          setIsFeatured(data.isFeatured);
        } else {
          throw new Error('Producto no encontrado');
        }
      } catch (err) {
        setError('Error cargando el producto: ' + err.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('richDescription', richDescription);
    formData.append('brand', brand);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('countInStock', countInStock);
    formData.append('rating', rating);
    formData.append('numReviews', numReviews);
    formData.append('isFeatured', isFeatured);
    if (image) {
      formData.append('image', image); // Si hay una nueva imagen, la agregamos
    }

    try {
      const response = await fetch(`https://nodejs-eshop-api-course-2c70.onrender.com/api/v1/products/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('Producto actualizado con éxito');
      } else {
        const data = await response.json();
        setError(data.message || 'Error actualizando el producto');
      }
    } catch (err) {
      setError('Error al actualizar el producto: ' + err.message);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {product ? (
        <div>
          <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>
          <form onSubmit={handleUpdate} encType="multipart/form-data">
            <div className="mb-4">
              <label htmlFor="name" className="block text-xl">Nombre del Producto</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 w-full border rounded bg-valorant-dark"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-xl">Descripción</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 w-full border rounded bg-valorant-dark"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="richDescription" className="block text-xl">Descripción Larga</label>
              <textarea
                id="richDescription"
                value={richDescription}
                onChange={(e) => setRichDescription(e.target.value)}
                className="p-2 w-full border rounded bg-valorant-dark"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="brand" className="block text-xl">Marca</label>
              <input
                type="text"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="p-2 w-full border rounded bg-valorant-dark"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block text-xl">Precio</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="p-2 w-full border rounded bg-valorant-dark"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block text-xl">Categoría</label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 w-full border rounded bg-valorant-dark"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="countInStock" className="block text-xl">Cantidad en Stock</label>
              <input
                type="number"
                id="countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                className="p-2 w-full border rounded bg-valorant-dark"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="rating" className="block text-xl">Valoración</label>
              <input
                type="number"
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="p-2 w-full border rounded bg-valorant-dark"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="numReviews" className="block text-xl">Número de Reseñas</label>
              <input
                type="number"
                id="numReviews"
                value={numReviews}
                onChange={(e) => setNumReviews(e.target.value)}
                className="p-2 w-full border rounded bg-valorant-dark"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="isFeatured" className="block text-xl">Destacado</label>
              <input
                type="checkbox"
                id="isFeatured"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="p-2 w-full border rounded bg-valorant-dark"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block text-xl">Imagen</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="p-2 w-full border rounded"
              />
            </div>

            <button type="submit" className="bg-green-500 text-white py-2 px-6 rounded">Actualizar Producto</button>
          </form>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default UpdateProduct;
