import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Anime {
  _id: string;
  titulo: string;
  image: string;
  synopsis: string;
  rating: number;
  genres: string[];
}

const Home = () => {
  const [featuredAnimes, setFeaturedAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    // Llamada a la API para obtener los animes
    axios.get('http://localhost:5000/animes')
      .then((res) => {
        // Supongamos que la API devuelve objetos con claves:
        // titulo, image, synopsis, rating, genero (array)
        // Mapeamos "genero" a "genres" para usar en la UI
        const animes = res.data.map((anime: any) => ({
          _id: anime._id,
          titulo: anime.titulo,
          image: anime.image,
          synopsis: anime.synopsis,
          rating: anime.rating,
          genres: anime.genero || [] // Ajusta según la propiedad que uses en el backend
        }));
        setFeaturedAnimes(animes);
      })
      .catch(err => console.error("Error al obtener animes:", err));
  }, []);

  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Track Your Anime Journey
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Discover, track, and share your favorite anime series
        </p>
        <Link to="/anime" className="btn-primary">
          Browse Anime
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Featured Anime
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAnimes.length > 0 ? (
            featuredAnimes.map((anime) => (
              <div key={anime._id} className="card">
                <img
                  src={anime.image}
                  alt={anime.titulo}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {anime.titulo}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {anime.synopsis}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-500">★</span>
                      <span className="text-gray-700 dark:text-gray-300">{anime.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {anime.genres.map((genre) => (
                        <span
                          key={genre}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No featured anime available</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
