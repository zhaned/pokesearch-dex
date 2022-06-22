import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../component/Loading/Loading';
import Results from '../component/Results/Results';

const Pokemon = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState();
  const [species, setSpecies] = useState();
  function fetchPokemon() {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data))
  }
  function fetchSpecies() {
    return fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then((res) => res.json())
      .then((data) => setSpecies(data));
  }
  useEffect(() => {
    fetchPokemon();
    fetchSpecies();
  }, []);

  //stops the component from rendering until data is fetched
  return pokemon && species ? <Results pokemon={pokemon} species={species} /> : <Loading />;
};

export default Pokemon;
