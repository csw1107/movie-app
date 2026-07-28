import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">🎬 MovieApp</Link>
      <div className="nav-links">
        <Link to="/">목록</Link>
        <Link to="/best">베스트</Link>
        <Link to="/new">영화 등록</Link>
      </div>
    </nav>
  );
}

export default Navbar;