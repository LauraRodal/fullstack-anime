import React, { useEffect, useState } from 'react';
import { BookmarkCheck, Play, Check, X } from 'lucide-react';
import axios from 'axios';

interface WatchlistItem {
  _id: string;
  title: string;
  image: string;
  status: string;
  progress: number;
  totalEpisodes: number;
}

const Watchlist: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await axios.get('http://localhost:5000/watchlist');
        setWatchlist(res.data);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  // Filtrado basado en el estado: all, watching, completed
  const filteredWatchlist = watchlist.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

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

      {loading ? (
        <p>Loading watchlist...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredWatchlist.length > 0 ? (
            filteredWatchlist.map((anime) => (
              <div key={anime._id} className="card">
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
                        <span>
                          Progress: {anime.progress} / {anime.totalEpisodes}
                        </span>
                        <span>
                          {Math.round((anime.progress / anime.totalEpisodes) * 100)}%
                        </span>
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
            ))
          ) : (
            <p>No watchlist items found for the selected filter.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
