import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PokeCycler.css';

const PokeCycler = ({pokeNumber, side}) => {
  let art;
  const [artUrl, setArtUrl] = useState({
    number1: pokeNumber,
    url1: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNumber}.png`,

  });

  function urlMaker() {
    pokeNumber = Math.floor(Math.random() * 897 + 1);
    art = {
      number1: pokeNumber,
      url1: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNumber}.png`
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
        <Link to={`/search/${artUrl.number1}`}>
          <img
            key={artUrl.number1}
            src={artUrl.url1}
            alt={artUrl.number1}
            className={`fade-in-${side} hover-${side}`}
          />
        </Link>
      </div>
    </div>
  );
};

export default PokeCycler;
