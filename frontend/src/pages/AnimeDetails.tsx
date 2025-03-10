import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, BookmarkPlus, Play, MessageSquare } from 'lucide-react';
import axios from 'axios';

interface Anime {
  _id: string;
  titulo: string;
  image: string;
  synopsis: string;
  genero: string[];
  rating: number;
  status: string;
  episodes: number;
  year: number;
  studio: string;
}

interface Review {
  _id: string;
  user: string;
  rating: number;
  content: string;
  date: string;
}

const AnimeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    // Obtener detalles del anime
    const fetchAnime = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/animes/${id}`);
        setAnime(res.data);
      } catch (error) {
        console.error("Error fetching anime details:", error);
      } finally {
        setLoading(false);
      }
    };

    // Obtener reseñas del anime
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/reviews?animeId=${id}`);
        setReviews(res.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchAnime();
    fetchReviews();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!anime) {
    return <div>No se encontró el anime.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="card">
        <div className="md:flex">
          <img
            src={anime.image}
            alt={anime.titulo}
            className="w-full md:w-72 h-96 object-cover"
          />
          <div className="p-6 flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {anime.titulo}
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
              {anime.genero.map((genre) => (
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
            {/* Aquí puedes agregar un formulario para crear una reseña */}
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
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
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
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
