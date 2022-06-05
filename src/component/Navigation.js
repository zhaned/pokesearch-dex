import { Link } from "react-router-dom";
const Navigation = () => {
    return (
      <nav className="navbar">
        Title Placeholder
        <div>
            <Link to="/">Home</Link>
            <Link to="/About">About</Link>
            <Link to="/Search">Search Page</Link>
        </div>
      </nav>
    );
}
 
export default Navigation;