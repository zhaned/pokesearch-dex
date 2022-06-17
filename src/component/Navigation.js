import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div
        className="rounded-pill pe-2"
        style={{
          backgroundColor: 'rgb(240, 240, 240)',
          border: '.2rem solid #851bed',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img
            src={require('../images/pokeapi-dex-icon.png')}
            alt=""
            className="m-1"
            style={{ height: '2rem' }}
          />
          <span style={{ color: 'rgb(133, 27, 237)' }}>PokeAPI Dex</span>
        </Link>
      </div>
      <div>
        {location.pathname !== '/Search' && (
          <Link to="/Search">
            <button className="btn btn-info mx-1">Search</button>
          </Link>
        )}
        {location.pathname !== '/About' && (
          <Link to="/About">
            <button className="btn btn-success mx-1">About</button>
          </Link>
        )}
        <div
          style={{
            display: 'inline-block',
            width: '1px' /* Line width */,
            backgroundColor: 'black' /* Line color */,
            height: '45px' /* Override in-line if you want specific height. */,
            float: 'left',
          }}
        ></div>
        {location.pathname !== '/Favorites' && ( //fix: add user auth later
          <Link to="/Favorites">
            <button className="btn btn-danger m-1">Favorites Page</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
