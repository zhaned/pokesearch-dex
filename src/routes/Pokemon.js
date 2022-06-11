import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Results from "../component/Results";

const Pokemon = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState();
  function fetchData() {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }
  useEffect(() => {
    fetchData();
  }, []);

  //stops the component from rendering until data is fetched
  return pokemon && <Results data={pokemon} id={id} />;
};

export default Pokemon;
