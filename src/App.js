import { useRoutes, useLocation } from "react-router-dom";

import Navigation from "./component/Navigation";
import Home from "./routes/Homepage";
import About from "./routes/About";
import SearchPage from "./routes/SearchPage";
import Favorites from "./routes/Favorites";

// checks current route to see if nav header should render
function useNav() {
  let { pathname } = useLocation();
  return pathname === "/" ? null : <Navigation />;
}
const RouteList = () => useRoutes([
{path: '/', element: <Home />},
{path: '/About', element: <About />},
{path: '/Search', element: <SearchPage />},
{path: '/Favorites', element: <Favorites />},
])
function App() {
  return (
    <div className="container">
      {useNav()}
      {RouteList()}
    </div>
  );
}

export default App;
