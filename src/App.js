import { useRoutes, useLocation } from 'react-router-dom';

import Navigation from './component/Navigation/Navigation';
import Home from './routes/Homepage/Homepage';
import About from './routes/About/About';
import Favorites from './routes/Favorites';
import Search from './routes/SearchPage';
import Pokemon from './routes/Pokemon';
import Abilities from './routes/Abilities';
import InfoPage from './component/Info/InfoPage';
import Moves from './routes/Moves';

import Error from './routes/Error';
import './App.css';

// checks current route to see if nav header should render
function useNav() {
  let { pathname } = useLocation();
  return pathname === '/' ? null : <Navigation />;
}

const RouteList = () =>
  useRoutes([
    { path: '/', element: <Home /> },
    { path: 'about', element: <About /> },
    { path: 'favorites', element: <Favorites /> },
    { path: 'search', element: <Search /> },
    { path: 'search/:id', element: <Pokemon /> },
    { path: 'ability', element: <Abilities /> },
    { path: 'ability/:id', element: <InfoPage /> },
    { path: 'move', element: <Moves /> },
    { path: 'move/:id', element: <InfoPage /> },
    { path: '*', element: <Error /> },
  ]);

function App() {
  return (
    <div className="bg">
      <div className="mb-1">{useNav()}</div>
      <div className="container fade-in-above">{RouteList()}</div>
    </div>
  );
}

export default App;
