import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PokeCycler.css";

const PokeCycler = () => {
  let pokeNumber = Math.floor(Math.random() * 897 + 1);
  let pokeNumber2 = Math.floor(Math.random() * 897 + 1);
  let art;
  const [artUrl, setArtUrl] = useState({
    number1: pokeNumber,
    url1: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNumber}.png`,
    number2: pokeNumber2,
    url2: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNumber2}.png`,
  });

  function urlMaker() {
    pokeNumber = Math.floor(Math.random() * 897 + 1);
    pokeNumber2 = Math.floor(Math.random() * 897 + 1);
    art = {
      number1: pokeNumber,
      url1: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNumber}.png`,
      number2: pokeNumber2,
      url2: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNumber2}.png`,
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
    <div
      className="d-flex justify-content-between align-items-center"
      style={{ marginTop: "10%" }}
    >
      <div className="img-container">
        <Link to={`/search/${artUrl.number1}`}>
          <img
            key={artUrl.number1}
            src={artUrl.url1}
            alt={artUrl.number1}
            className="fade-in-left"
          />
        </Link>
      </div>
      <div className="img-container">
        <Link to={`/Search/${artUrl.number2}`}>
          <img
            key={artUrl.number2}
            src={artUrl.url2}
            alt={artUrl.number2}
            className="fade-in-right"
          />
        </Link>
      </div>
    </div>
  );
};

export default PokeCycler;
