import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../component/Loading/Loading';
import Results from '../component/Results/Results';

const Pokemon = () => {
  let { id } = useParams();
  const [pokemon, setPokemon] = useState();
  const [species, setSpecies] = useState();
  const [evolution, setEvolution] = useState();
  const [types, setTypes] = useState();
  useEffect(() => {
    function fetchPokemon() {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((data) => setPokemon(data));
    }
    function fetchSpecies() {
      return fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((data) => setSpecies(data));
    }
    function fetchEvolution() {
      return fetch(`https://pokeapi.co/api/v2/pokemon-species/1/`)
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((data) => setEvolution(data));
    }
    function fetchTypes() {
      return fetch(`https://pokeapi.co/api/v2/type/12/`)
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((data) => setTypes(data));
    }
    fetchPokemon();
    fetchSpecies();
    fetchTypes();
    fetchEvolution();
  }, []);

  //stops the component from rendering until data is fetched
  return pokemon && species ? (
    <Results pokemon={pokemon} species={species} evolution={evolution} types={types} />
  ) : (
    <Loading />
  );
};

export default Pokemon;
