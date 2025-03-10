import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';

interface Anime {
  _id: string;
  titulo: string;
  image: string;
  synopsis: string;
  genero: string[]; // O usa "genres" si tu backend devuelve ese campo
  rating: number;
}

const AnimeList: React.FC = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // Lista de géneros para filtrar
  const genres = [
    'Acción', 'Aventura', 'Comedia', 'Drama', 'Fantasía',
    'Thriller', 'Misterio', 'Romance', 'Ciencia Ficción', 'Psicológico'
  ];

  useEffect(() => {
    // Llama a la API para obtener los animes
    axios.get('http://localhost:5000/animes')
      .then((res) => {
        setAnimes(res.data);
      })
      .catch(err => console.error("Error al obtener animes:", err));
  }, []);

  // Filtra los animes según la búsqueda y géneros seleccionados
  const filteredAnimes = animes.filter(anime => {
    // Verifica si el título o la sinopsis coinciden con la búsqueda
    const matchesSearch = anime.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          anime.synopsis.toLowerCase().includes(searchQuery.toLowerCase());
    // Si no hay géneros seleccionados, se acepta; si hay, al menos uno debe coincidir
    const matchesGenre = selectedGenres.length === 0 ||
                         selectedGenres.some(genre => anime.genero.includes(genre));
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="flex-shrink-0">
          <select className="input">
            <option value="">Sort by</option>
            <option value="rating">Rating</option>
            <option value="title">Title</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenres(prev =>
              prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre]
            )}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedGenres.includes(genre)
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnimes.length > 0 ? (
          filteredAnimes.map((anime) => (
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
                    {anime.genero.map((genre) => (
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
          <p>No anime found.</p>
        )}
      </div>
    </div>
  );
};

export default AnimeList;
