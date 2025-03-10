import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { User, Settings, BookOpen, Star } from 'lucide-react';
import axios from 'axios';

interface UserStats {
  watching: number;
  completed: number;
  reviews: number;
}

const Profile = () => {
  const { user, profile } = useAuthStore();
  const [stats, setStats] = useState<UserStats>({
    watching: 0,
    completed: 0,
    reviews: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    // Solo carga estadísticas si el usuario está logueado
    if (user) {
      axios
        .get(`http://localhost:5000/users/${user.id}/stats`)
        .then((res) => {
          setStats(res.data);
        })
        .catch((err) => {
          console.error('Error al obtener las estadísticas:', err);
        })
        .finally(() => {
          setLoadingStats(false);
        });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-600 dark:text-gray-300">Please login to view your profile</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="card p-6">
        <div className="flex items-center space-x-4">
          <div className="h-20 w-20 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
            <User className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {profile?.username || user.email}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Member since {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
          <button className="ml-auto btn-secondary">
            <Settings className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Watching
            </h2>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {loadingStats ? '...' : stats.watching}
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Star className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Completed
            </h2>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {loadingStats ? '...' : stats.completed}
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Star className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Reviews
            </h2>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {loadingStats ? '...' : stats.reviews}
          </p>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="text-gray-600 dark:text-gray-300 text-center py-8">
          No recent activity
        </div>
      </div>
    </div>
  );
};

export default Profile;
