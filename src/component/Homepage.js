import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <div>You are on the Home Page.</div>
      <Link to='/Search'>Search</Link>
      <Link to='/About'>About</Link>
    </div>
  );
};

export default Homepage;
