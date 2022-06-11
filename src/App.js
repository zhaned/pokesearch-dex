import { useRoutes, useLocation } from "react-router-dom";

import Navigation from "./component/Navigation";
import Home from "./routes/Homepage";
import About from "./routes/About";
import Favorites from "./routes/Favorites";
import Search from "./routes/SearchPage";
import Pokemon from "./routes/Pokemon";
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
    { path: "*", element: <Error /> },
  ]);

function App() {
  return (
    <>
    <div className="container mb-2">{useNav()}</div>
    <div className="container fade-in-above">
      {RouteList()}
    </div>
    </>
  );
}

export default App;
