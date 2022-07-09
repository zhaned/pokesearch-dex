import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import Ability from './Ability';
const AbilityPage = () => {
  let { id } = useParams();
  const [ability, setAbility] = useState();
  const [version, setVersion] = useState("20");

  function fetchAbility() {
    return fetch(`https://pokeapi.co/api/v2/ability/${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => setAbility(data));
  }
  useEffect(() => {
    fetchAbility();
  }, []);
  return ability ? <Ability ability={ability} version={version}/> : <Loading />;
};

export default AbilityPage;
