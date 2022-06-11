import { useEffect, useState } from "react";
import "./PokeCycler.css";

const PokeCycler = () => {
  
let pokeNumber = Math.floor(Math.random() * 897 + 1);
let pokeNumber2= Math.floor(Math.random() * 897 + 1);
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
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="d-flex justify-content-between">
      <div className='image1'>
        <img
          key={artUrl.number1}
          src={artUrl.url1}
          alt={artUrl.number1}
          className="fade-in-left"
        />
      </div>
      <div className="image2">
        <img
          key={artUrl.number2}
          src={artUrl.url2}
          alt={artUrl.number2}
          className="fade-in-right"
        />
      </div>
    </div>
  );

  //   const [artUrl1, setArtUrl1] = useState();
  //   const [artUrl2, setArtUrl2] = useState();
  //   let pokeNumber, art;

  //   function urLMaker() {
  //     pokeNumber = Math.floor(Math.random() * 897);
  //     return {
  //       number: pokeNumber,
  //       url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNumber}.png`,
  //     };
  //   }

  //   function GeneratePoke() {
  //     art = urLMaker();
  //     return <img src={art.url} alt={art.number} />;
  //   }

  //   function twoPokes() {
  //     return (
  //       <>
  //         <div>{GeneratePoke()}</div>
  //         <div>{GeneratePoke()}</div>
  //       </>
  //     );
  //   }

  //   useEffect(() => {
  //     let interval = setInterval(() => {
  //         twoPokes();
  //         setArtUrl1(art.url);
  //         setArtUrl2(art.url);
  //     }, 2000);
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }, []);

  //   return <>{twoPokes()}</>;
};

export default PokeCycler;
