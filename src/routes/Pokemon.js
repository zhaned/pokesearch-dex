import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Results from "../component/Results";

const Pokemon = () => {
  const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
//   const data = fetchData();
  function fetchData() {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }
  useEffect(() => {
    fetchData();
  }, []);
  // async function getJSON(id) {
  //   let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  //   var json = await response.json();
  //   return json
  // }

  // getJSON(id)
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return <Results data={pokemon} id={id} />;
};

export default Pokemon;
