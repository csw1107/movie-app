import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovie, getReviewsByMovie, createReview, type Movie, type Review } from "../data";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const [author, setAuthor] = useState("");
  const [score, setScore] = useState(5);
  const [content, setContent] = useState("");

  useEffect(() => {
    setMovie(getMovie(Number(id)) ?? null);
    setReviews(getReviewsByMovie(Number(id)));
  }, [id]);

  const handleSubmit = () => {
    if (author === "" || content === "") {
      alert("작성자와 내용을 입력해주세요.");
      return;
    }

    const saved = createReview({
      movieId: Number(id),
      author: author,
      score: score,
      content: content,
      createdAt: new Date().toISOString().slice(0, 10),
    });
    setReviews([...reviews, saved]);
    setAuthor("");
    setContent("");
    setScore(5);
  };

  if (!movie) return <p>불러오는 중...</p>;

  return (
    <div className="container">
      <Link to="/">← 목록으로</Link>

      <div className="detail">
        <img src={movie.poster} alt={movie.title} />
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.year} · {movie.genre} · ⭐{movie.rating}</p>
          <p>감독: {movie.director}</p>
          <p>{movie.summary}</p>
        </div>
      </div>

      <div className="reviews">
        <h2>리뷰 ({reviews.length})</h2>
        {reviews.length === 0 ? (
          <p>아직 리뷰가 없습니다.</p>
        ) : (
          reviews.map((review) => (
            <div className="review" key={review.id}>
              <strong>{review.author}</strong> · ⭐{review.score}
              <p>{review.content}</p>
              <small>{review.createdAt}</small>
            </div>
          ))
        )}

        <div className="review-form">
          <h3>리뷰 작성</h3>
          <input
            type="text"
            placeholder="작성자"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <select value={score} onChange={(e) => setScore(Number(e.target.value))}>
            <option value={5}>⭐5</option>
            <option value={4}>⭐4</option>
            <option value={3}>⭐3</option>
            <option value={2}>⭐2</option>
            <option value={1}>⭐1</option>
          </select>
          <textarea
            placeholder="리뷰 내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleSubmit}>등록</button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;