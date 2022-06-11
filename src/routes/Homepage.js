import { Link } from "react-router-dom";
import PokeCycler from "../component/PokeCycler/PokeCycler";

const Homepage = () => {
  return (
    <div>
      <h1
        className="display-3 text-center"
        style={{
          color: "#f0f0f0",
          textShadow: "2px 2px #851bed",
        }}
      >
        Welcome to PokeAPI Dex!
      </h1>
      <PokeCycler />
        <div
          style={{
            verticalAlign: "middle",
            textAlign: "center",
            textShadow: "2px 2px #851bed",
          }}
        >
          <Link to="/Search" style={{ color: "#f0f0f0" }}>
            Look up Pokemon now!
          </Link>
        </div>
    </div>
  );
};

export default Homepage;
