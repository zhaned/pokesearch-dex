import { useEffect, useState } from "react";

const PokeCycler = () => {
  /* 
ok so what you needa do here is:
1. pick a random number from 1-900
2. insert that number to this url: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/[NUMBER GOES HERE].png
3. after 6 seconds, remove the image
4. repeat step 1-3
5. [optional] animate fade in fade out image
*/

  const [artUrl, setArtUrl] = useState({});
  let pokeNumber, pokeNumber2, art;

  function urlMaker() {
    pokeNumber = Math.floor(Math.random() * 897);
    pokeNumber2 = Math.floor(Math.random() * 897);
    art = {
      number1: pokeNumber,
      url1: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNumber}.png`,
      number2: pokeNumber2,
      url2: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNumber2}.png`,
    };
    console.log(art);
    return art;
  }


  useEffect(() => {
    const intervalId = setInterval(() => {
        const pokeArt = urlMaker()
      setArtUrl(pokeArt);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
      <div>
          <img src={artUrl.url1} alt={artUrl.number1} />
          <img src={artUrl.url2} alt={artUrl.number2} />
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
