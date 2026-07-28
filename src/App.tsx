import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import MovieList from "./pages/MovieList";
import MovieForm from "./pages/MovieForm";
import MovieEdit from "./pages/MovieEdit";
import Best from "./pages/Best";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/new" element={<MovieForm />} />
        <Route path="/edit/:id" element={<MovieEdit />} />
        <Route path="/best" element={<Best />} />
        <Route path="*" element={<h1 style={{ padding: 40 }}>404 - 페이지를 찾을 수 없습니다</h1>} />
      </Routes>
    </HashRouter>
  );
}

export default App;