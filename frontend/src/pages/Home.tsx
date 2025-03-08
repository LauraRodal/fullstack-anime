import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // This is a placeholder for the featured animes section
  const featuredAnimes = [
    {
      id: '1',
      title: 'Attack on Titan',
      image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?auto=format&fit=crop&q=80&w=800',
      synopsis: 'Humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason.',
      rating: 9.0,
      genres: ['Action', 'Drama', 'Fantasy']
    },
    // Add more featured animes here
  ];

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
          {featuredAnimes.map((anime) => (
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
      </section>
    </div>
  );
};

export default Home;