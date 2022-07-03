import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../component/Loading/Loading";
import Results from "../component/Results/Results";

const Pokemon = () => {
  let { id } = useParams();
  const [pokemon, setPokemon] = useState();
  const [species, setSpecies] = useState();
  const [evolution, setEvolution] = useState();
  const [types, setTypes] = useState();
  useEffect(() => {
    function fetchPokemon() {
      let types = [];
      return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((data) => {
          setPokemon(data);
          return data;
        })
        .then((data) => {
          data.types.map((type) =>
            fetch(type.type.url)
              .then((res) => (res.ok ? res.json() : Promise.reject(res)))
              .then((data) => {
                types.push(data);
                setTypes(types);
              })
          );
        });
    }
    function fetchSpecies() {
      return fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((data) => {
          setSpecies(data);
          return data;
        })
        .then((data) => {
          fetch(data.evolution_chain.url)
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then((data) => {
              setEvolution(data);
            });
        });
    }
    fetchPokemon();
    fetchSpecies();
  }, []);

  //stops the component from rendering until data is fetched
  return types && evolution ? (
    <Results
      pokemon={pokemon}
      species={species}
      evolution={evolution}
      types={types}
    />
  ) : (
    <Loading />
  );
};

export default Pokemon;
