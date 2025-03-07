import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [newAnime, setNewAnime] = useState("");

  useEffect(() => {
    // Obtén los animes desde el backend
    axios
      .get("http://localhost:5000/animes")
      .then((response) => setAnimeList(response.data))
      .catch((error) => console.log(error));
  }, []);

  const addAnime = () => {
    // Agregar un nuevo anime
    if (newAnime) {
      axios
        .post("http://localhost:5000/animes", { name: newAnime })
        .then((response) => {
          setAnimeList([...animeList, response.data]);
          setNewAnime("");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <h1>Lista de Animes</h1>
      <ul>
        {animeList.map((anime, index) => (
          <li key={index}>{anime.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newAnime}
        onChange={(e) => setNewAnime(e.target.value)}
        placeholder="Añadir anime"
      />
      <button onClick={addAnime}>Añadir</button>
    </div>
  );
}

export default App;
