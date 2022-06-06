import { Route, Routes, useLocation } from "react-router-dom";

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

function App() {
  return (
    <div className="container">
      {useNav()}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Search" element={<SearchPage />} />
        <Route path="/Favorites" element={<Favorites />} /> 
      </Routes>
    </div>
  );
}

export default App;
