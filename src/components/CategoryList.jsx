import { useState, useEffect } from "react";

function CategoryList({ token }) {
    const [categories, setCategories] = useState([]);
    const API_URL = "https://nodejs-eshop-api-course-2c70.onrender.com/api/v1/categories";
  
    useEffect(() => {
      fetchCategories();
    }, []);
  
    const fetchCategories = async () => {
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setCategories(data);
    };
    const handleDelete = async (id) => {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.ok) {
          setCategories(categories.filter((category) => category.id !== id));
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    };
  
    return (
      <div>
        <h2>Lista de Categorías</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              {category.name} - <span style={{ color: category.color }}>{category.color}</span>
              <button onClick={() => handleDelete(category.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default CategoryList;
  