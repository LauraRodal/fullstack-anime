require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((err) => console.log('Error de conexión:', err));

const animeSchema = new mongoose.Schema({
  name: String,
});

const Anime = mongoose.model('Anime', animeSchema);

app.get('/animes', async (req, res) => {
  const animes = await Anime.find();
  res.json(animes);
});

app.post('/animes', async (req, res) => {
  const anime = new Anime({ name: req.body.name });
  await anime.save();
  res.json(anime);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
