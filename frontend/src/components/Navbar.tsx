import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Tv2, Search, User, BookmarkCheck, LogIn } from 'lucide-react';

const Navbar = () => {
  const { user, signOut } = useAuthStore();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Tv2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">AnimeTracker</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/anime" className="nav-link">
              <Search className="h-5 w-5" />
              <span>Browse</span>
            </Link>

            {user ? (
              <>
                <Link to="/watchlist" className="nav-link">
                  <BookmarkCheck className="h-5 w-5" />
                  <span>Watchlist</span>
                </Link>
                <Link to="/profile" className="nav-link">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="nav-link text-red-600 dark:text-red-400"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="nav-link">
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;