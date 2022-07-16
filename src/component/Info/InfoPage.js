import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import Ability from './Ability';
import Move from './Move';
const InfoPage = () => {
  const [info, setInfo] = useState();
  const [version, setVersion] = useState('20');

  const infoType = useLocation().pathname.split('/')[1];
  let { id } = useParams();

  function fetchInfo() {
    return fetch(`https://pokeapi.co/api/v2/${infoType}/${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => setInfo(data));
  }
  useEffect(() => {
    fetchInfo();
  }, []);
  return info ? (
    infoType === 'ability' ? (
      <Ability ability={info} version={version} />
    ) : (
      <Move move={info} version={version} />
    )
  ) : (
    <Loading />
  );
};

export default InfoPage;
