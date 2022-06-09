import { Link } from "react-router-dom";
import PokeCycler from "../component/PokeCycler/PokeCycler";

const Homepage = () => {

  
  return (
    <div>
      <div>You are on the Home Page.</div>
      <Link to='/About'>About</Link>
      <PokeCycler />
    </div>
  );
};

export default Homepage;
