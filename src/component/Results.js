import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Results = (props) => {
console.log(props.data, props.id)

//   console.log(props.id)
//   async function fetchData() {
//     await fetch(`https://pokeapi.co/api/v2/pokemon/${props.id}`)
//       .then((res) => res.json())
//       .then((data) => setPokemon(data));
//   }
//   useEffect(() => {
//     fetchData();
//   }, []);

    // const sprites = (obj) => Object.keys(pokemon.sprites).map(sprite => pokemon.sprites[sprite][obj]);
  return (
    <div>
      Hello this is the pokemon page. It should have /search/{props.id} in the url.
      <img src={props.data.sprites.other['official-artwork'].front_default} alt={props.id} />
    </div>
  );
};

export default Results;
