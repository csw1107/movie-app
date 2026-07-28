import { useState, useEffect } from "react";
import { getMovies, type Movie } from "../data";

function Best() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [sortBy, setSortBy] = useState<"rating" | "liked">("rating");

  useEffect(() => {
    setMovies(getMovies());
  }, []);

  // 정렬 기준에 따라 순서 정하기
  const sorted = [...movies].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating; // 평점 높은 순
    } else {
      return Number(b.liked) - Number(a.liked); // 좋아요한 것 먼저
    }
  });

  return (
    <div className="container">
      <h1>베스트 영화</h1>

      <div className="filters">
        <button
          className={sortBy === "rating" ? "active" : ""}
          onClick={() => setSortBy("rating")}
        >
          평점순
        </button>
        <button
          className={sortBy === "liked" ? "active" : ""}
          onClick={() => setSortBy("liked")}
        >
          좋아요순
        </button>
      </div>

      <ol className="ranking">
        {sorted.map((movie, index) => (
          <li key={movie.id} className="rank-item">
            <span className="rank-number">{index + 1}</span>
            <img src={movie.poster} alt={movie.title} />
            <div>
              <h3>{movie.title}</h3>
              <p>{movie.year} · {movie.genre} · ⭐{movie.rating} {movie.liked ? "· ♥" : ""}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Best;