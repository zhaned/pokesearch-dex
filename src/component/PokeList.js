import { Link } from "react-router-dom";
import PokeImage from "./pokeImage";

export default function PokeList({ pokemon }) {
  return (
    <div>
      {pokemon.map((p) => (
        <div
          key={p}
          className="card "
          style={{ width: "8rem", height: "8rem" }}
        >
          <Link to={{ pathname: `/Search/${p[0]}`}}>
            {p[0]}
            <PokeImage url={p[1]} />
          </Link>
        </div>
      ))}
    </div>
  );
}
