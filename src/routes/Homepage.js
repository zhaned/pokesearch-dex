import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PokeCycler from '../component/PokeCycler/PokeCycler';

const Homepage = () => {
  let pokeNumber = Math.floor(Math.random() * 897 + 1);
  let pokeNumber2 = Math.floor(Math.random() * 897 + 1);
  const pokeIcon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/25.png`;

  return (
    <div>
      <h1
        className="display-3 text-center"
        style={{
          color: '#f0f0f0',
          textShadow: '2px 2px #851bed',
          marginTop: '5%',
        }}
      >
        Welcome to PokeAPI Dex!
      </h1>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ marginTop: '5%' }}
      >
        <PokeCycler pokeNumber={pokeNumber} side={'left'} />
        <div className='d-flex flex-column'
          style={{
            // verticalAlign: 'middle',
            // textAlign: 'center',
            textShadow: '2px 2px #851bed',
          }}
        >
          <img src={pokeIcon} alt="" />
          <Link to="/Search" style={{ color: '#f0f0f0' }}>
            <button
              className="btn btn-secondary btn-lg"
              style={{ color: '#f0f0f0', textShadow: '2px 2px #851bed' }}
            >
              Look up Pokemon now!
            </button>
          </Link>
        </div>
        <PokeCycler pokeNumber={pokeNumber2} side={'right'} />
      </div>
    </div>
  );
};

export default Homepage;
