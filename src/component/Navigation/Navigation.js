import { Link, useLocation } from "react-router-dom";
import NavSideBar from "../../routes/About/NavSideBar";
import ScrollTop from "./NavFunctions";
import "./Navigation.css";

const Navigation = () => {
  const location = useLocation();
  return (
    <nav
      className="navbar border-bottom border-2"
      style={{ backgroundColor: "rgba(0,0,0,.15)" }}
    >
      <Link
        to="/"
        className=""
        style={{ textDecoration: "none", textShadow: "0px 0px #f8f9fa" }}
      >
        <div className="rounded-pill pe-2 home-link">
          <img
            src={require("../../images/pokeapi-dex-icon.png")}
            alt=""
            className="m-1"
            style={{ height: "2rem" }}
          />
          <span>PokéAPI Dex</span>
        </div>
      </Link>
      <div>
        {location.pathname !== "/search" && (
          <Link to="/search">
            <button className="btn btn-info mx-1">Search</button>
          </Link>
        )}
        {location.pathname !== "/about" && (
          <Link to="/about">
            <button className="btn btn-success mx-1">About</button>
          </Link>
        )}
        <Link
          to="/favorites"
          className="border-start border-2"
          style={{ padding: "16px 0px" }}
        >
          <button className="btn btn-danger m-1">Favorites</button>
        </Link>
      </div>
      <ScrollTop />
      <NavSideBar />
    </nav>
  );
};

export default Navigation;
