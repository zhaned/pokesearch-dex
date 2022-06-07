import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navbar">
      <div>
        <Link to="/">
          <img
            src="pokeapi-dex-icon.ico"
            alt="icon"
            style={{
              height: "24px",
            }}
          />
          PokeAPI Dex
        </Link>
      </div>
      <div>
        <Link to="/About">About</Link>
        <Link to="/Search">Search Page</Link>
        <Link to="/Favorites">Favorites Page</Link>
      </div>
    </nav>
  );
};

export default Navigation;
