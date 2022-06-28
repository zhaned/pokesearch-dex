import { Link } from 'react-router-dom';
import PokeImage from './pokeImage';
import './pokeList.css';

export default function PokeList({ pokemon }) {
  function urlToNumber(url) {
    const num = url.slice(34).split('/');
    return num[0];
  }
  return (
    <div
      className="d-flex flex-wrap justify-content-center text-center fade-in-above shadow rounded"
      style={{ backgroundColor: 'rgb(200, 200, 200, .4)' }}
    >
      {pokemon.map((p) => (
        <Link
          key={p}
          to={{ pathname: `/Search/${urlToNumber(p[1])}` }}
          style={{ textDecoration: 'none' }}
        >
          <div
            className="card m-2 align-content-center shadow"
            style={{
              width: '9rem',
              height: '12rem',
              backgroundColor: '#8b43d4',
              backgroundImage: 'var(--bs-gradient)',
              border: 'solid 2px #f8f9fa',
              color: '#f7f7f7',
            }}
          >
            <div className="mt-2">
              {`#${urlToNumber(p[1])} ` + p[0].charAt(0).toUpperCase() + p[0].slice(1)}
            </div>
            <PokeImage url={p[1]} />
          </div>
        </Link>
      ))}
    </div>
  );
}
