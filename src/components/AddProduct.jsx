import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AddProduct = ({ token }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [richDescription, setRichDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [image, setImage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Para verificar si el usuario es admin
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Validar si el usuario es admin
  const checkAdmin = (token) => {
    try {
      const decoded = jwtDecode(token); // Decodificamos el token
      setIsAdmin(decoded.isAdmin); // Establecemos el estado isAdmin
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  // Verificamos si hay un token y si el usuario es admin al cargar el componente
  useState(() => {
    if (token) {
      checkAdmin(token); // Verificamos si es admin
    }
  }, [token]);

  // Controlador de la imagen
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);  // Guardamos la imagen seleccionada
  };

  // Enviar los datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin) {
      setError('No tienes permisos para agregar productos');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('richDescription', richDescription);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('countInStock', countInStock);
    if (image) {
      formData.append('image', image); // Añadimos la imagen
    }

    try {
      const res = await fetch('https://nodejs-eshop-api-course-2c70.onrender.com/api/v1/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}` // Asegúrate de pasar el token para verificar que el usuario esté logeado
        },
        body: formData, // Enviamos los datos incluyendo la imagen
      });

      if (res.ok) {
        setSuccess('Producto añadido correctamente');
        setName('');
        setDescription('');
        setRichDescription('');
        setPrice('');
        setCategory('');
        setCountInStock('');
        setImage(null); // Limpiamos el formulario después de la subida
      } else {
        const data = await res.json();
        setError(data.message || 'Error al agregar el producto');
      }
    } catch (error) {
      setError('Error al agregar el producto: ' + error.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Añadir Producto</h1>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="name" className="block text-xl">Nombre del Producto</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 w-full border rounded"
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
            className="p-2 w-full border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="richDescription" className="block text-xl">Descripción Larga</label>
          <textarea
            id="richDescription"
            value={richDescription}
            onChange={(e) => setRichDescription(e.target.value)}
            className="p-2 w-full border rounded"
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
            className="p-2 w-full border rounded"
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
            className="p-2 w-full border rounded"
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
            className="p-2 w-full border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-xl">Imagen</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="p-2 w-full border rounded"
            required
          />
        </div>

        <button type="submit" className="bg-green-500 text-white py-2 px-6 rounded">Añadir Producto</button>
      </form>
    </div>
  );
};

export default AddProduct;
