import React, { useState } from 'react';

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [director, setDirector] = useState("");
  const [plot, setPlot] = useState("");
  const [genres, setGenres] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState("");
  const [votes, setVotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateInputs = () => {
    if (!title || !year || !director || !plot || !genres || !poster || !rating || !votes) {
      setError("Todos los campos son obligatorios.");
      return false;
    }
    if (isNaN(year) || isNaN(rating) || isNaN(votes)) {
      setError("El año, la calificación de IMDB y los votos de IMDB deben ser números.");
      return false;
    }
    setError("");
    return true;
  };

  const addMovie = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const newMovie = {
      title,
      year: Number(year),
      director,
      plot,
      genres: genres.split(","),
      poster,
      imbd: {
        rating: Number(rating),
        votes: Number(votes)
      }
    };

    try {
      const res = await fetch("https://christian-api-node-movies.netlify.app/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newMovie)
      });

      if (res.ok) {
        setTitle("");
        setYear("");
        setDirector("");
        setPlot("");
        setGenres("");
        setPoster("");
        setRating("");
        setVotes("");
        setSuccess("¡Película añadida correctamente!");
        window.location.reload(); // Recargar la página
      } else {
        setError("Error al añadir la película: " + res.statusText);
      }
    } catch (error) {
      setError("Error al añadir la película: " + error.message);
    }
  };

  return (
    <form onSubmit={addMovie} className="mb-8">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 bg-valorant-dark text-valorant rounded" />
        <input type="number" placeholder="Año" value={year} onChange={(e) => setYear(e.target.value)} className="p-2 bg-valorant-dark text-valorant rounded" />
        <input type="text" placeholder="Director" value={director} onChange={(e) => setDirector(e.target.value)} className="p-2 bg-valorant-dark text-valorant rounded" />
        <input type="text" placeholder="Trama" value={plot} onChange={(e) => setPlot(e.target.value)} className="p-2 bg-valorant-dark text-valorant rounded" />
        <input type="text" placeholder="Géneros (separados por comas)" value={genres} onChange={(e) => setGenres(e.target.value)} className="p-2 bg-valorant-dark text-valorant rounded" />
        <input type="text" placeholder="URL del póster" value={poster} onChange={(e) => setPoster(e.target.value)} className="p-2 bg-valorant-dark text-valorant rounded" />
        <input type="number" placeholder="Calificación de IMDB" value={rating} onChange={(e) => setRating(e.target.value)} className="p-2 bg-valorant-dark text-valorant rounded" />
        <input type="number" placeholder="Votos de IMDB" value={votes} onChange={(e) => setVotes(e.target.value)} className="p-2 bg-valorant-dark text-valorant rounded" />
      </div>
      <div className="flex space-x-4 mt-4">
        <button type="submit" className="bg-valorant text-valorant-dark p-2 rounded">Añadir Película</button>
      </div>
    </form>
  );
};

export default AddMovie;
