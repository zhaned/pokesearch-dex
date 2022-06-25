import { useRoutes, useLocation } from "react-router-dom";

import Navigation from "./component/Navigation";
import Home from "./routes/Homepage/Homepage";
import About from "./routes/About";
import Favorites from "./routes/Favorites";
import Search from "./routes/SearchPage";
import Pokemon from "./routes/Pokemon";
import Abilities from "./routes/Abilities";
import Moves from "./routes/Moves";

import Error from "./routes/Error";

// checks current route to see if nav header should render
function useNav() {
  let { pathname } = useLocation();
  return pathname === "/" ? null : <Navigation />;
}

const RouteList = () =>
  useRoutes([
    { path: "/", element: <Home /> },
    { path: "About", element: <About /> },
    { path: "Favorites", element: <Favorites /> },
    { path: "Search", element: <Search /> },
    { path: "Search/:id", element: <Pokemon  /> },
    { path: "Abilities", element: <Abilities /> },
    { path: "Abilities/:id", element: <Abilities  /> },
    { path: "Moves", element: <Moves /> },
    { path: "Moves/:id", element: <Moves  /> },
    { path: "*", element: <Error /> },
  ]);

function App() {
  return (
    <>
    <div className="mb-1">{useNav()}</div>
    <div className="container fade-in-above">
      {RouteList()}
    </div>
    </>
  );
}

export default App;
