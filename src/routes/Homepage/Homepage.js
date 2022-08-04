import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PokeCycler from '../../component/PokeCycler/PokeCycler';
import './Homepage.css';

const Homepage = () => {
  const [pokemon, setPokemon] = useState('');
  let pokeNumber = Math.floor(Math.random() * 897 + 1);
  let pokeNumber2 = Math.floor(Math.random() * 897 + 1);
  const pokeIcon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/1.png`;
  const abilityIcon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/109.png`;
  const moveIcon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/251.png`;

  useEffect(() => {
    document.title = 'PokéAPI Dex';
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=898`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, []);
  return (
    <div>
      <h1
        className="display-3 text-center"
        style={{
          color: '#f8f9fa',
          textShadow: '2px 2px #851bed',
          marginTop: '5%',
        }}
      >
        Welcome to PokéAPI Dex!
      </h1>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ marginTop: '5%' }}
      >
        {pokemon ? <PokeCycler pokeNumber={pokeNumber} side={'left'} list={pokemon} /> : null}
        <div
          className="align-self-start"
          style={{
            textShadow: '2px 2px #851bed',
          }}
        >
          {/*fixed?: animations are in the way of the button so you can't click */}
          <div className="mb-3 sprite-ani">
            <Link to="/search" style={{ color: '#f8f9fa' }}>
              <div className="sprite-icon container p-0">
                <img
                  src={pokeIcon}
                  alt=""
                  className="img-fluid d-flex"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectPosition: '0px -37px',
                  }}
                />
              </div>
              <button
                className="btn btn-danger btn-lg"
                style={{ color: '#f8f9fa', textShadow: '2px 2px #851bed' }}
              >
                Look up Pokémon now!
              </button>
            </Link>
          </div>
          <div className="mb-3 sprite-ani">
            <Link to="/ability" style={{ color: '#f8f9fa' }}>
              <div className="sprite-icon container p-0">
                <img
                  src={abilityIcon}
                  alt=""
                  className="img-fluid d-flex"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectPosition: '0px -37px',
                  }}
                />
              </div>
              <button
                className="btn btn-success btn-lg"
                style={{ color: '#f8f9fa', textShadow: '2px 2px #851bed' }}
              >
                ... or abilities!
              </button>
            </Link>
          </div>
          <div className="mb-3 sprite-ani">
            <Link to="/move" style={{ color: '#f8f9fa' }}>
              <div className="sprite-icon container p-0">
                <img
                  src={moveIcon}
                  alt=""
                  className="img-fluid d-flex"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectPosition: '0px -37px',
                  }}
                />
              </div>
              <button
                className="btn btn-primary btn-lg"
                style={{ color: '#f8f9fa', textShadow: '2px 2px #851bed' }}
              >
                ... or even moves!
              </button>
            </Link>
          </div>
        </div>
        {pokemon ? <PokeCycler pokeNumber={pokeNumber2} side={'right'} list={pokemon} /> : null}
      </div>
    </div>
  );
};

export default Homepage;
