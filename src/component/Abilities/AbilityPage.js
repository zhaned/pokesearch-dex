import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import Ability from './Ability';
import Move from './Move';
const AbilityPage = () => {
  let { id } = useParams();
  const test = useLocation().pathname.split('/')[1];

  const [ability, setAbility] = useState();
  const [version, setVersion] = useState("20");

  function fetchAbility() {
    return fetch(`https://pokeapi.co/api/v2/${test}/${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => setAbility(data));
  }
  useEffect(() => {
    fetchAbility();
  }, []);
  return ability ? test === 'ability' ? <Ability ability={ability} version={version}/> : <Move ability={ability} version={version}/> : <Loading />;
};

export default AbilityPage;
