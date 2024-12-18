import { useEffect, useState } from 'react';
import Pagination from './Pagination';

const ListMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    title: '',
    director: '',
    genre: ''
  });
  const itemsPerPage = 6;

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    filterMovies();
  }, [movies, filters]);

  const fetchMovies = async () => {
    try {
      const res = await fetch("https://christian-api-node-movies.netlify.app/api/movies");
      const data = await res.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const filterMovies = () => {
    const filtered = movies.filter(movie => 
      movie.title.toLowerCase().includes(filters.title.toLowerCase()) &&
      movie.director.toLowerCase().includes(filters.director.toLowerCase()) &&
      movie.genres.some(genre => genre.toLowerCase().includes(filters.genre.toLowerCase()))
    );
    setFilteredMovies(filtered);
  };

  const deleteMovie = async (id) => {
    try {
      const res = await fetch(`https://christian-api-node-movies.netlify.app/api/movies/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        fetchMovies();
      } else {
        console.error("Error deleting movie:", res.statusText);
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const moviesOnPage = filteredMovies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      {/* Formulario de filtros */}
      <form className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={filters.title}
            onChange={handleFilterChange}
            className="p-2 bg-valorant-dark text-valorant rounded"
          />
          <input
            type="text"
            name="director"
            placeholder="Director"
            value={filters.director}
            onChange={handleFilterChange}
            className="p-2 bg-valorant-dark text-valorant rounded"
          />
          <input
            type="text"
            name="genre"
            placeholder="Género"
            value={filters.genre}
            onChange={handleFilterChange}
            className="p-2 bg-valorant-dark text-valorant rounded"
          />
        </div>
      </form>

      {/* Grid de películas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {moviesOnPage.length === 0 ? (
          <p className="text-red-500">No se encontraron películas.</p>
        ) : (
          moviesOnPage.map((movie) => (
            <div key={movie._id} className="bg-valorant-dark p-4 rounded-lg shadow-lg">
              <img src={movie.poster} alt={movie.title} className="w-full h-48 object-contain mb-4 rounded-lg" loading="lazy" />
              <h2 className="text-2xl font-semibold text-valorant mb-2">{movie.title}</h2>
              <p className="text-lg">Year: {movie.year}</p>
              <p className="text-lg">Director: {movie.director}</p>
              <p className="text-lg">Plot: {movie.plot}</p>
              <p className="text-lg">Genres: {movie.genres.join(', ')}</p>
              <p className="text-lg">IMDB Rating: {movie.imbd.rating}</p>
              <p className="text-lg">IMDB Votes: {movie.imbd.votes}</p>
              <button onClick={() => deleteMovie(movie._id)} className="bg-red-500 text-white p-2 rounded mt-4">Delete</button>
            </div>
          ))
        )}
      </div>
      
      {/* Componente de paginación */}
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
};

export default ListMovies;
