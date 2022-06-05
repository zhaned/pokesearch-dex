import { Link } from "react-router-dom";
const Navigation = () => {
    return (
      <nav>
        temporary nav bar til later
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
        <Link to="/Search">Search Page</Link>
      </nav>
    );
}
 
export default Navigation;