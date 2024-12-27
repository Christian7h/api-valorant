import { useState, useEffect } from "react";

function AddCategory({ token }) {
  const [formData, setFormData] = useState({ name: "", icon: "", color: "" });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const API_URL = "https://nodejs-eshop-api-course-2c70.onrender.com/api/v1/categories";

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch existing categories
  const fetchCategories = async () => {
    const response = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setCategories(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = selectedCategory ? "PUT" : "POST";
    const url = selectedCategory ? `${API_URL}/${selectedCategory.id}` : API_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchCategories(); // Reload categories
        setFormData({ name: "", icon: "", color: "" });
        setSelectedCategory(null);
      }
    } catch (error) {
      console.error("Error submitting category:", error);
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setFormData({ name: category.name, icon: category.icon, color: category.color });
  };

  return (
    <div className="bg-valorant-dark min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-3xl font-bold text-valorant mb-6">{selectedCategory ? "Editar Categoría" : "Añadir Categoría"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xl text-white">Nombre</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="p-2 w-full bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-600"
              required
            />
          </div>
          <div>
            <label htmlFor="icon" className="block text-xl text-white">Icono</label>
            <input
              type="text"
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="p-2 w-full bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label htmlFor="color" className="block text-xl text-white">Color</label>
            <input
              type="color"
              id="color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-200"
          >
            {selectedCategory ? "Actualizar" : "Añadir"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
