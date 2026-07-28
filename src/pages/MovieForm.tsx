import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMovie } from "../data";

function MovieForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState(5);
  const [poster, setPoster] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = () => {
    if (title === "" || genre === "") {
      alert("제목과 장르는 필수입니다.");
      return;
    }

    createMovie({
      title: title,
      genre: genre,
      director: director,
      year: Number(year),
      rating: Number(rating),
      poster: poster || "https://picsum.photos/200/300",
      summary: summary,
      liked: false,
      reviewCount: 0,
    });
    navigate("/"); // 등록 끝나면 목록으로 이동
  };

  return (
    <div className="container">
      <h1>새 영화 등록</h1>

      <div className="movie-form">
        <input placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
  <option value="">장르 선택</option>
  <option value="SF">SF</option>
  <option value="드라마">드라마</option>
  <option value="액션">액션</option>
  <option value="로맨스">로맨스</option>
</select>
        <input placeholder="감독" value={director} onChange={(e) => setDirector(e.target.value)} />
        <input placeholder="연도 (예: 2024)" value={year} onChange={(e) => setYear(e.target.value)} />
       <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
  <option value={5}>⭐5.0</option>
  <option value={4.5}>⭐4.5</option>
  <option value={4}>⭐4.0</option>
  <option value={3.5}>⭐3.5</option>
  <option value={3}>⭐3.0</option>
  <option value={2.5}>⭐2.5</option>
  <option value={2}>⭐2.0</option>
  <option value={1.5}>⭐1.5</option>
  <option value={1}>⭐1.0</option>
</select>
        <input placeholder="포스터 주소 (비워도 됨)" value={poster} onChange={(e) => setPoster(e.target.value)} />
        <textarea placeholder="줄거리" value={summary} onChange={(e) => setSummary(e.target.value)} />

        <div className="form-buttons">
          <button onClick={handleSubmit}>등록</button>
          <button onClick={() => navigate("/")}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default MovieForm;