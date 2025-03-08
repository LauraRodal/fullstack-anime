import React, { useState } from 'react';
import { Search } from 'lucide-react';

const AnimeList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
    'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life'
  ];

  // Placeholder data - will be replaced with Supabase query
  const animes = [
    {
      id: '1',
      title: 'Fullmetal Alchemist: Brotherhood',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=800',
      synopsis: 'Two brothers search for a Philosopher\'s Stone after an attempt to revive their deceased mother goes awry.',
      genres: ['Action', 'Adventure', 'Drama', 'Fantasy'],
      rating: 9.5
    },
    {
      id: '2',
      title: 'Death Note',
      image: 'https://images.unsplash.com/photo-1612487528505-d2338264c821?auto=format&fit=crop&q=80&w=800',
      synopsis: 'A high school student discovers a supernatural notebook that allows him to kill anyone by writing the victim\'s name.',
      genres: ['Mystery', 'Thriller', 'Supernatural'],
      rating: 9.0
    }
  ];

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
        {animes.map((anime) => (
          <div key={anime.id} className="card">
            <img
              src={anime.image}
              alt={anime.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {anime.title}
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
        ))}
      </div>
    </div>
  );
};

export default AnimeList;