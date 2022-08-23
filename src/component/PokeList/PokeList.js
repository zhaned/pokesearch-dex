import { Link } from 'react-router-dom';
import PokeImage from './pokeImage';
import './pokeList.css';

export default function PokeList({ pokemon }) {
  function urlToNumber(url) {
    const num = url.slice(42).split('/');
    return num[0];
  }
  return (
    <div
      className="d-flex flex-wrap justify-content-center text-center fade-in-above shadow rounded"
      style={{ backgroundColor: 'rgb(200, 200, 200, .4)' }}
    >
      {pokemon.map((p) => (
        <Link
          key={p.entry_number}
          to={{ pathname: `/search/${p.pokemon_species.name}` }}
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
              {`#${p.entry_number} ` + p.pokemon_species.name.charAt(0).toUpperCase() + p.pokemon_species.name.slice(1)}
            </div>
            <PokeImage url={urlToNumber(p.pokemon_species.url)} />
          </div>
        </Link>
      ))}
    </div>
  );
}
