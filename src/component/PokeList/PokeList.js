import { Link } from 'react-router-dom';
import PokeImage from './pokeImage';
import './pokeList.css';

export default function PokeList({ pokemon }) {
  return (
    <div
      className="d-flex flex-wrap justify-content-center text-center fade-in-above shadow rounded"
      style={{ backgroundColor: 'rgb(200, 200, 200, .4)' }}
    >
      {pokemon.map((p) => (
        <Link
        key={p.entry_number}
        to={{ pathname: `/search/${p.name}` }}
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
            <div className="my-2">
              {`#${p.entry_number} ` + p.name.charAt(0).toUpperCase() + p.name.slice(1)}
            </div>
            <PokeImage url={p.url} />
          </div>
        </Link>
      ))}
    </div>
  );
}
