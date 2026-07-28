import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovie, updateMovie } from "../data";

function MovieEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState(5);
  const [poster, setPoster] = useState("");
  const [summary, setSummary] = useState("");

  // 기존 영화 정보 불러와서 입력칸 채우기
  useEffect(() => {
    const data = getMovie(Number(id));
    if (!data) return;
    setTitle(data.title);
    setGenre(data.genre);
    setDirector(data.director || "");
    setYear(String(data.year));
    setRating(Number(data.rating));
    setPoster(data.poster || "");
    setSummary(data.summary || "");
  }, [id]);

  const handleSubmit = () => {
    if (title === "" || genre === "") {
      alert("제목과 장르는 필수입니다.");
      return;
    }

    const updatedMovie = {
      title: title,
      genre: genre,
      director: director,
      year: Number(year),
      rating: Number(rating),
      poster: poster,
      summary: summary,
    };

    updateMovie(Number(id), updatedMovie);
    navigate("/");
  };

  return (
    <div className="container">
      <h1>영화 수정</h1>

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
        <input placeholder="연도" value={year} onChange={(e) => setYear(e.target.value)} />
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
        <input placeholder="포스터 주소" value={poster} onChange={(e) => setPoster(e.target.value)} />
        <textarea placeholder="줄거리" value={summary} onChange={(e) => setSummary(e.target.value)} />

        <div className="form-buttons">
          <button onClick={handleSubmit}>저장</button>
          <button onClick={() => navigate("/")}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default MovieEdit;