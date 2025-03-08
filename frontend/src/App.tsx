import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';  // Asegúrate de tener el Navbar
import Home from './pages/Home';  // Asegúrate de tener la página Home
import AnimeList from './pages/AnimeList';  // Asegúrate de tener la página AnimeList
import Profile from './pages/Profile';  // Asegúrate de tener la página Profile
import Watchlist from './pages/Watchlist';  // Asegúrate de tener la página Watchlist
import Login from './pages/Login';  // Asegúrate de tener la página Login
import Register from './pages/Register';  // Asegúrate de tener la página Register
import AnimeDetails from './pages/AnimeDetails';  // Asegúrate de tener la página AnimeDetails

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anime" element={<AnimeList />} />
            <Route path="/anime/:id" element={<AnimeDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
