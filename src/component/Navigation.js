import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div
        className="rounded-pill px-2"
        style={{
          backgroundColor: "rgb(240, 240, 240)",
          border: ".2rem solid #851bed",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
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
        {location.pathname !== "/Search" && (
          <Link to="/Search">
            <button className="btn btn-info mx-1">Search</button>
          </Link>
        )}
        {location.pathname !== "/About" && (
          <Link to="/About">
            <button className="btn btn-success mx-1">About</button>
          </Link>
        )}
        {location.pathname !== "/Favorites" && (
          <Link to="/Favorites">
            <button className="btn btn-danger m-1">Favorites Page</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
