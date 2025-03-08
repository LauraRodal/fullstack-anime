import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';

const Login = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setUser(data.user);
      navigate('/profile');
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="card w-full max-w-md p-8">
        <div className="flex items-center justify-center mb-8">
          <LogIn className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Welcome Back
        </h1>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="inline-block animate-spin mr-2">⏳</span>
            ) : (
              <LogIn className="h-5 w-5 mr-2" />
            )}
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;