import { Route, Routes, useLocation } from "react-router-dom";

import Navigation from "./component/Navigation";
import Home from "./component/Homepage";
import About from "./component/About";
import SearchPage from "./component/SearchPage";

// updates nav existence upon entering a new route
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
      </Routes>
    </div>
  );
}

export default App;
