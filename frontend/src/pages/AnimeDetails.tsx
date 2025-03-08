import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, BookmarkPlus, Play, MessageSquare } from 'lucide-react';

const AnimeDetails = () => {
  const { id } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Placeholder data - will be replaced with Supabase query
  const anime = {
    id: '1',
    title: 'Fullmetal Alchemist: Brotherhood',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=800',
    synopsis: 'Two brothers search for a Philosopher\'s Stone after an attempt to revive their deceased mother goes awry.',
    genres: ['Action', 'Adventure', 'Drama', 'Fantasy'],
    rating: 9.5,
    status: 'Completed',
    episodes: 64,
    year: 2009,
    studio: 'Bones'
  };

  const reviews = [
    {
      id: '1',
      user: 'AnimeExpert',
      rating: 9,
      content: 'One of the best anime series ever made. The story is compelling, the characters are well-developed, and the animation is top-notch.',
      date: '2024-02-15'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="card">
        <div className="md:flex">
          <img
            src={anime.image}
            alt={anime.title}
            className="w-full md:w-72 h-96 object-cover"
          />
          <div className="p-6 flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {anime.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {anime.synopsis}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</h3>
                <p className="text-gray-900 dark:text-white">{anime.status}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Episodes</h3>
                <p className="text-gray-900 dark:text-white">{anime.episodes}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Year</h3>
                <p className="text-gray-900 dark:text-white">{anime.year}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Studio</h3>
                <p className="text-gray-900 dark:text-white">{anime.studio}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {anime.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="flex space-x-4">
              <button className="btn-primary flex items-center space-x-2">
                <BookmarkPlus className="h-5 w-5" />
                <span>Add to Watchlist</span>
              </button>
              <button className="btn-secondary flex items-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Start Watching</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reviews</h2>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="btn-primary flex items-center space-x-2"
          >
            <MessageSquare className="h-5 w-5" />
            <span>Write Review</span>
          </button>
        </div>

        {showReviewForm && (
          <div className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rating
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                  <button
                    key={rating}
                    className="h-8 w-8 rounded-full flex items-center justify-center border border-gray-300 dark:border-gray-600 hover:bg-indigo-600 hover:text-white"
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Review
              </label>
              <textarea
                className="input h-32"
                placeholder="Write your review..."
              />
            </div>
            <button className="btn-primary">Submit Review</button>
          </div>
        )}

        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {review.user}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {review.rating}/10
                    </span>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;