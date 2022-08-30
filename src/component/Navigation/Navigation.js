import { Link, useLocation } from 'react-router-dom';
import NavSideBar from './FilterSidebar';
import ScrollTop from './ScrollTop';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  return (
    <nav
      className="navbar border-bottom border-2"
      style={{ backgroundColor: 'rgba(0,0,0,.15)' }}
    >
      <Link
        to="/"
        style={{ textDecoration: 'none', textShadow: '0px 0px #f8f9fa' }}
      >
        <div className="rounded-pill pe-2 home-link">
          <img
            src={require('../../images/pokeapi-dex-icon.png')}
            alt=""
            className="m-1"
            style={{ height: '2rem' }}
          />
          <span>PokéAPI Dex</span>
        </div>
      </Link>
      <div>
        {location.pathname !== '/search' && (
          <Link to="/search">
            <button className="btn btn-danger mx-1">Pokémon</button>
          </Link>
        )}
        {location.pathname !== '/ability' && (
          <Link to="/ability">
            <button className="btn btn-success mx-1">Abilities</button>
          </Link>
        )}
        {location.pathname !== '/move' && (
          <Link to="/move">
            <button className="btn btn-primary mx-1">Moves</button>
          </Link>
        )}
        {location.pathname !== '/about' && (
          <Link to="/about">
            <button className="btn btn-info mx-1">About</button>
          </Link>
        )}
        <a
          href="https://github.com/zhaned/pokeapi-dex-client"
          target={'_blank'}
          rel="noreferrer noopener"
          className="border-start border-2 git-link"
          style={{
            padding: '1.5rem .5rem',
            background:
              'linear-gradient(rgba(45,45,45, 0.35),rgba(45,45,45, 0.35) )',
          }}
        >
          <img
          className=''
            src={require('../../images/GitHub-Icon.png')}
            alt={'GitHub'}
            style={{ height: '2.5rem' }}
          />
        </a>
      </div>
      <ScrollTop />
      {location.pathname === '/search' ? (
        <NavSideBar location={location.pathname} />
      ) : location.pathname === '/ability' ? (
        <NavSideBar location={location.pathname} />
      ) : location.pathname === '/move' ? (
        <NavSideBar location={location.pathname} />
      ) : null}
    </nav>
  );
};

export default Navigation;
