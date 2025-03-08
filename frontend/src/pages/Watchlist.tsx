import React, { useState } from 'react';
import { BookmarkCheck, Play, Check, X } from 'lucide-react';

const Watchlist = () => {
  const [filter, setFilter] = useState('all');

  // Placeholder data - will be replaced with Supabase query
  const watchlist = [
    {
      id: '1',
      title: 'One Piece',
      image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?auto=format&fit=crop&q=80&w=800',
      status: 'watching',
      progress: 1043,
      totalEpisodes: 1080
    },
    {
      id: '2',
      title: 'Demon Slayer',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=800',
      status: 'plan_to_watch',
      progress: 0,
      totalEpisodes: 26
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Watchlist</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('watching')}
            className={`btn ${filter === 'watching' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Watching
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {watchlist.map((anime) => (
          <div key={anime.id} className="card">
            <div className="flex items-center p-4">
              <img
                src={anime.image}
                alt={anime.title}
                className="h-24 w-24 object-cover rounded"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {anime.title}
                </h3>
                <div className="flex items-center space-x-2 mt-2">
                  <BookmarkCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-gray-600 dark:text-gray-300 capitalize">
                    {anime.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>Progress: {anime.progress} / {anime.totalEpisodes}</span>
                    <span>{Math.round((anime.progress / anime.totalEpisodes) * 100)}%</span>
                  </div>
                  <div className="mt-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div
                      className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full"
                      style={{ width: `${(anime.progress / anime.totalEpisodes) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="ml-4 flex space-x-2">
                <button className="btn-secondary">
                  <Play className="h-4 w-4" />
                </button>
                <button className="btn-secondary">
                  <Check className="h-4 w-4" />
                </button>
                <button className="btn-secondary text-red-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;