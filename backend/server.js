require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((err) => console.log('Error de conexión:', err));

/* =========================
   Esquema y Modelo de Anime
   ========================= */
const animeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  image: { type: String, required: true },
  synopsis: { type: String, required: true },
  genero: { type: [String], required: true },
  rating: { type: Number, min: 0, max: 10 },
  estado: { type: String, enum: ['watching', 'completed', 'plan_to_watch'], required: true },
  episodios: { type: Number, required: true },
  year: { type: Number, required: true },
  studio: { type: String },
  createdAt: { type: Date, default: Date.now }
});
const Anime = mongoose.model('Anime', animeSchema);

/* =========================
   Endpoints para Animes
   ========================= */

// Obtener todos los animes
app.get('/animes', async (req, res) => {
  try {
    const animes = await Anime.find();
    res.json(animes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los animes' });
  }
});

// Obtener un anime por ID
app.get('/animes/:id', async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) return res.status(404).json({ error: 'Anime no encontrado' });
    res.json(anime);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el anime' });
  }
});

// Crear un nuevo anime
app.post('/animes', async (req, res) => {
  try {
    const { titulo, image, synopsis, genero, rating, estado, episodios, year, studio } = req.body;
    const nuevoAnime = new Anime({ titulo, image, synopsis, genero, rating, estado, episodios, year, studio });
    await nuevoAnime.save();
    res.status(201).json(nuevoAnime);
  } catch (err) {
    res.status(400).json({ error: 'Error al guardar el anime', details: err.message });
  }
});

// Actualizar un anime
app.put('/animes/:id', async (req, res) => {
  try {
    const animeActualizado = await Anime.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!animeActualizado) return res.status(404).json({ error: 'Anime no encontrado' });
    res.json(animeActualizado);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar el anime', details: err.message });
  }
});

// Eliminar un anime
app.delete('/animes/:id', async (req, res) => {
  try {
    const animeEliminado = await Anime.findByIdAndDelete(req.params.id);
    if (!animeEliminado) return res.status(404).json({ error: 'Anime no encontrado' });
    res.json({ message: 'Anime eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el anime' });
  }
});

/* =========================
   Esquema y Modelo de Usuario
   ========================= */
const userSchema = new mongoose.Schema({
  id_supabase: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String }, // Puedes hacer obligatorio si lo deseas
  created_at: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

/* =========================
   Endpoint para guardar un usuario (después del registro en Supabase)
   ========================= */
app.post('/register-user', async (req, res) => {
  try {
    const { id_supabase, email, username } = req.body;

    // Crear y guardar el usuario en MongoDB
    const newUser = new User({
      id_supabase,
      email,
      username,
      created_at: new Date()
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuario guardado en MongoDB', user: newUser });
  } catch (error) {
    console.error('Error al guardar usuario en MongoDB:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

/* =========================
   Iniciar el servidor
   ========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
