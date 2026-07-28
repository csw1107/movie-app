// 영화/리뷰 데이터를 localStorage 에서 관리 (json-server 대체)
// 첫 실행 시 db.json 의 초기 데이터로 채운다.

export interface Movie {
  id: number;
  title: string;
  genre: string;
  director: string;
  year: number;
  poster: string;
  summary: string;
  rating: number;
  reviewCount: number;
  liked: boolean;
}

export interface Review {
  id: number;
  movieId: number;
  author: string;
  score: number;
  content: string;
  createdAt: string;
}

// db.json 의 초기 데이터 (서버 없이도 첫 화면에 보이도록)
const INITIAL_MOVIES: Movie[] = [
  { id: 1, title: "인터스텔라", genre: "SF", director: "크리스토퍼 놀란", year: 2014, poster: "https://picsum.photos/200/300?random=1", summary: "우주로 떠나는 이야기", rating: 4.8, reviewCount: 2, liked: true },
  { id: 2, title: "기생충", genre: "드라마", director: "봉준호", year: 2019, poster: "https://picsum.photos/200/300?random=2", summary: "두 가족의 이야기", rating: 4.6, reviewCount: 1, liked: false },
  { id: 3, title: "매드맥스", genre: "액션", director: "조지 밀러", year: 2015, poster: "https://picsum.photos/200/300?random=3", summary: "사막 위의 추격전", rating: 4.3, reviewCount: 0, liked: true },
  { id: 4, title: "라라랜드", genre: "로맨스", director: "데이미언 셔젤", year: 2016, poster: "https://picsum.photos/200/300?random=4", summary: "꿈과 사랑 사이", rating: 4.5, reviewCount: 1, liked: false },
  { id: 5, title: "듄", genre: "SF", director: "드니 빌뇌브", year: 2021, poster: "https://picsum.photos/200/300?random=5", summary: "모래 행성의 서사", rating: 4.2, reviewCount: 0, liked: false },
];

const INITIAL_REVIEWS: Review[] = [
  { id: 1, movieId: 1, author: "홍길동", score: 5, content: "인생 영화", createdAt: "2026-07-20" },
  { id: 2, movieId: 1, author: "김철수", score: 4, content: "음악이 좋아요", createdAt: "2026-07-20" },
  { id: 3, movieId: 2, author: "이영희", score: 5, content: "몰입감 최고", createdAt: "2026-07-20" },
  { id: 4, movieId: 4, author: "박민수", score: 4, content: "영상미가 예쁨", createdAt: "2026-07-20" },
];

const MOVIES_KEY = "movie-app:movies";
const REVIEWS_KEY = "movie-app:reviews";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {
    // 손상된 값이면 무시
  }
  localStorage.setItem(key, JSON.stringify(fallback));
  return fallback;
}

function write<T>(key: string, value: T): T {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}

function nextId(rows: { id: number }[]): number {
  return rows.reduce((max, r) => Math.max(max, r.id), 0) + 1;
}

// ---- Movies ----
export function getMovies(): Movie[] {
  return read<Movie[]>(MOVIES_KEY, INITIAL_MOVIES);
}

export function getMovie(id: number): Movie | undefined {
  return getMovies().find((m) => m.id === id);
}

export function createMovie(data: Omit<Movie, "id">): Movie {
  const movies = getMovies();
  const created: Movie = { ...data, id: nextId(movies) };
  write(MOVIES_KEY, [created, ...movies]);
  return created;
}

export function updateMovie(id: number, patch: Partial<Movie>): Movie | undefined {
  const movies = getMovies();
  const updated = movies.map((m) => (m.id === id ? { ...m, ...patch, id } : m));
  write(MOVIES_KEY, updated);
  return updated.find((m) => m.id === id);
}

export function deleteMovie(id: number): void {
  write(MOVIES_KEY, getMovies().filter((m) => m.id !== id));
  // 해당 영화의 리뷰도 함께 정리
  write(REVIEWS_KEY, getReviews().filter((r) => r.movieId !== id));
}

// ---- Reviews ----
export function getReviews(): Review[] {
  return read<Review[]>(REVIEWS_KEY, INITIAL_REVIEWS);
}

export function getReviewsByMovie(movieId: number): Review[] {
  return getReviews().filter((r) => r.movieId === movieId);
}

export function createReview(data: Omit<Review, "id">): Review {
  const reviews = getReviews();
  const created: Review = { ...data, id: nextId(reviews) };
  write(REVIEWS_KEY, [...reviews, created]);

  // 리뷰 수 갱신
  const movie = getMovie(data.movieId);
  if (movie) {
    updateMovie(movie.id, { reviewCount: getReviewsByMovie(movie.id).length });
  }
  return created;
}

export function deleteReview(id: number): void {
  write(REVIEWS_KEY, getReviews().filter((r) => r.id !== id));
}
