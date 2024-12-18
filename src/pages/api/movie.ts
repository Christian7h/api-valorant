import type { APIRoute } from 'astro';
export const GET: APIRoute = async () => {
  try {
    // Hacer una solicitud GET a tu API Node.js que obtiene todas las películas
    const response = await fetch('https://christian-api-node-movies.netlify.app/api/movies');
    const movies = await response.json(); // Parsear la respuesta JSON

    return new Response(JSON.stringify(movies), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error al obtener películas' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const movieData = await request.json(); // Obtener los datos de la película del cuerpo de la solicitud

    const response = await fetch('https://christian-api-node-movies.netlify.app/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData), // Enviar los datos de la nueva película
    });

    const movie = await response.json(); // Obtener la respuesta de la API

    return new Response(JSON.stringify(movie), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error al agregar película' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
    try {
      const { id } = params; // Asumimos que el ID de la película se pasa como parámetro en la URL
  
      const response = await fetch(`https://christian-api-node-movies.netlify.app/api/movies/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Error al eliminar la película');
      }
  
      return new Response(JSON.stringify({ message: 'Película eliminada correctamente' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ message: error || 'Error al eliminar la película' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  };