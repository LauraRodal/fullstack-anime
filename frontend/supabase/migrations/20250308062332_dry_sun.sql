/*
  # Initial Schema for Anime Tracker

  1. New Tables
    - `users`
      - Extended user profile data
      - Links to Supabase auth.users
    - `animes`
      - Stores anime information
    - `watchlist`
      - User's anime watchlist
    - `reviews`
      - User reviews for animes
    - `watch_progress`
      - Tracks user's watching progress
    - `review_votes`
      - Stores votes on reviews

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table for extended profile data
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Animes table
CREATE TABLE IF NOT EXISTS animes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  synopsis text,
  cover_image text,
  genres text[],
  status text CHECK (status IN ('airing', 'completed', 'upcoming')) DEFAULT 'upcoming',
  rating numeric CHECK (rating >= 0 AND rating <= 10),
  release_year integer,
  total_episodes integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Watchlist table
CREATE TABLE IF NOT EXISTS watchlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  anime_id uuid REFERENCES animes(id) ON DELETE CASCADE,
  status text CHECK (status IN ('plan_to_watch', 'watching', 'completed', 'dropped')) DEFAULT 'plan_to_watch',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, anime_id)
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  anime_id uuid REFERENCES animes(id) ON DELETE CASCADE,
  content text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 10),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, anime_id)
);

-- Watch progress table
CREATE TABLE IF NOT EXISTS watch_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  anime_id uuid REFERENCES animes(id) ON DELETE CASCADE,
  episodes_watched integer DEFAULT 0,
  last_watched_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, anime_id)
);

-- Review votes table
CREATE TABLE IF NOT EXISTS review_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  review_id uuid REFERENCES reviews(id) ON DELETE CASCADE,
  vote_type text CHECK (vote_type IN ('upvote', 'downvote')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, review_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE animes ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE watch_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;

-- Policies

-- Users policies
CREATE POLICY "Users can read all profiles"
  ON users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Animes policies
CREATE POLICY "Anyone can read animes"
  ON animes FOR SELECT
  TO authenticated
  USING (true);

-- Watchlist policies
CREATE POLICY "Users can read own watchlist"
  ON watchlist FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own watchlist"
  ON watchlist FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Anyone can read reviews"
  ON reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own reviews"
  ON reviews FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Watch progress policies
CREATE POLICY "Users can read own progress"
  ON watch_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own progress"
  ON watch_progress FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Review votes policies
CREATE POLICY "Anyone can read votes"
  ON review_votes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own votes"
  ON review_votes FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);