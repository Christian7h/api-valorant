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
    <div>
      <h2>{selectedCategory ? "Editar Categoría" : "Añadir Categoría"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </label>
        <label>
          Icono:
          <input
            type="text"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          />
        </label>
        <label>
          Color:
          <input
            type="color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          />
        </label>
        <button type="submit">{selectedCategory ? "Actualizar" : "Añadir"}</button>
      </form>
    </div>
  );
}

export default AddCategory;
