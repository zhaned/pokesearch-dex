import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navigation from "./component/Navigation";
import Home from './component/Homepage'
import About from './component/About'
import SearchPage from "./component/SearchPage";

function App() {
  return (
    <div className="container">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Search" element={<SearchPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
