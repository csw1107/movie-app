import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieModal from "./MovieModal";
import { getMovies, updateMovie, deleteMovie, type Movie } from "../data";

function MovieList() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genre, setGenre] = useState("전체");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [onlyLiked, setOnlyLiked] = useState(false);

  useEffect(() => {
    setMovies(getMovies());
  }, []);

  const genres = ["전체", ...new Set(movies.map((m) => m.genre))];

  let shown = genre === "전체" ? movies : movies.filter((m) => m.genre === genre);
  if (onlyLiked) {
    shown = shown.filter((m) => m.liked);
  }

  const toggleLike = (movie: Movie) => {
    const updated = !movie.liked;
    updateMovie(movie.id, { liked: updated });
    setMovies(movies.map((m) => (m.id === movie.id ? { ...m, liked: updated } : m)));
  };

  // 영화 삭제
  const handleDelete = (movie: Movie) => {
    if (!confirm(`"${movie.title}"을(를) 삭제할까요?`)) return;
    deleteMovie(movie.id);
    setMovies(movies.filter((m) => m.id !== movie.id));
  };

  return (
    <div className="container">
      <div className="top-bar">
        <h1>영화 목록</h1>
        <button className="add-btn" onClick={() => navigate("/new")}>+ 영화 등록</button>
      </div>

      <div className="filters">
        {genres.map((g) => (
          <button
            key={g}
            className={genre === g ? "active" : ""}
            onClick={() => setGenre(g)}
          >
            {g}
          </button>
        ))}
        <button
          className={onlyLiked ? "active" : ""}
          onClick={() => setOnlyLiked(!onlyLiked)}
        >
          ♥ 찜만
        </button>
      </div>

      <div className="grid">
        {shown.map((movie) => (
          <div className="card" key={movie.id}>
            <button
              className={movie.liked ? "like-btn liked" : "like-btn"}
              onClick={() => toggleLike(movie)}
            >
              {movie.liked ? "♥" : "♡"}
            </button>
            <div onClick={() => setSelectedMovie(movie)}>
              <img src={movie.poster} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>{movie.year} · {movie.genre} · ⭐{movie.rating}</p>
            </div>
            <div className="card-actions">
              <button onClick={() => navigate(`/edit/${movie.id}`)}>수정</button>
              <button onClick={() => handleDelete(movie)}>삭제</button>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}

export default MovieList;