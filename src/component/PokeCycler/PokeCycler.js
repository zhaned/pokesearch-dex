import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PokeCycler.css';

const PokeCycler = ({ pokeNumber, side, list }) => {
  let art;
  const [artUrl, setArtUrl] = useState({
    name: nameGetter(pokeNumber),
    url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNumber}.png`,
  });

  function nameGetter(number) {
    const result = list.find(obj => obj.url === `https://pokeapi.co/api/v2/pokemon/${number}/`);
    return result.name;
  }

  function urlMaker() {
    pokeNumber = Math.floor(Math.random() * 897 + 1);
    art = {
      name: nameGetter(pokeNumber),
      url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNumber}.png`,
    };
    return art;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setArtUrl(urlMaker());
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="img-container container-fluid">
        <Link to={`/search/${artUrl.name}`}>
          <img
            key={artUrl.name}
            src={artUrl.url}
            alt={artUrl.name}
            className={`fade-in-${side} hover-${side}`}
          />
        </Link>
      </div>
    </div>
  );
};

export default PokeCycler;
