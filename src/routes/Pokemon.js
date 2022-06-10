import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Pokemon = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, []);

  return (
    <div>
      Hellow this is the pokemon page. It should have /search/{id} in the url.
      {pokemon.name}
    </div>
  );
};

export default Pokemon;
