import { Link } from "react-router-dom";
import PokeImage from "./pokeImage";
import "./pokeList.css";

export default function PokeList({ pokemon }) {
  return (
    <div
      className="d-flex flex-wrap justify-content-center text-center fade-in-above shadow"
      style={{ backgroundColor: "rgb(133, 27, 237, .3)" }}
    >
      {pokemon.map((p) => (
        <Link key={p} to={{ pathname: `/Search/${p[0]}` }}>
          <div
            className="card m-3 align-content-center shadow"
            style={{ width: "9rem", height: "12rem" }}
          >
            {p[0]}
            <PokeImage url={p[1]} />
          </div>
        </Link>
      ))}
    </div>
  );
}
