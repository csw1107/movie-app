import { useState, useEffect } from "react";
import { getReviewsByMovie, createReview, deleteReview, type Movie, type Review } from "../data";

interface Props {
  movie: Movie;
  onClose: () => void;
}

function MovieModal({ movie, onClose }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [author, setAuthor] = useState("");
  const [score, setScore] = useState(5);
  const [content, setContent] = useState("");

  useEffect(() => {
    setReviews(getReviewsByMovie(movie.id));
  }, [movie.id]);

  const handleSubmit = () => {
    if (author === "" || content === "") {
      alert("작성자와 내용을 입력해주세요.");
      return;
    }

    const saved = createReview({
      movieId: movie.id,
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

  // 리뷰 삭제
  const handleDelete = (reviewId: number) => {
    if (!confirm("이 리뷰를 삭제할까요?")) return;
    deleteReview(reviewId);
    setReviews(reviews.filter((r) => r.id !== reviewId));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

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
                <button
                  className="review-delete"
                  onClick={() => handleDelete(review.id)}
                >
                  삭제
                </button>
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
    </div>
  );
}

export default MovieModal;