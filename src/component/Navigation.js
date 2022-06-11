import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div
        className="border rounded-pill px-2"
        style={{ backgroundColor: "rgb(245, 245, 245)" }}
      >
        <Link to="/">
          <img
            src="pokeapi-dex-icon.ico"
            alt="icon"
            className="m-1"
            style={{ height: "2rem" }}
          />
          <span style={{ color: "rgb(133, 27, 237)" }}>PokeAPI Dex</span>
        </Link>
      </div>

      <div>
        {location.pathname !== "/About" && (
          <Link to="/About">
            <button className="btn btn-info">About</button>
          </Link>
        )}
        {location.pathname !== "/Search" && (
          <Link to="/Search">
            <button className="btn btn-info">Search Page</button>
          </Link>
        )}
        {location.pathname !== "/Favorites" && (
          <Link to="/Favorites">
            <button className="btn btn-danger">Favorites Page</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
