import { Link } from "react-router-dom";
import PokeImage from "./pokeImage";
import "./pokeList.css";

export default function PokeList({ pokemon }) {
  return (
    <div
      className="d-flex flex-wrap justify-content-center text-center fade-in-above shadow rounded"
      style={{ backgroundColor: "rgb(200, 200, 200, .4)" }}
    >
      {pokemon.map((p) => (
        <Link
          key={p}
          to={{ pathname: `/Search/${p[0]}` }}
          style={{ textDecoration: "none" }}
        >
          <div
            className="card m-3 align-content-center shadow"
            style={{
              width: "9rem",
              height: "12rem",
              backgroundColor: "#8b43d4",
              backgroundImage: "var(--bs-gradient)",
              border: "solid 2px #f0f0f0",
              color: "#f7f7f7",
            }}
          >
            {p[0]}
            <PokeImage url={p[1]} />
          </div>
        </Link>
      ))}
    </div>
  );
}
