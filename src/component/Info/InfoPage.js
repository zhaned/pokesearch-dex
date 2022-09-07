import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import Ability from './Ability';
import Move from './Move';
const InfoPage = () => {
  const [info, setInfo] = useState();
  //fixed: use the global state version or just use latest
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
      <Ability ability={info} />
    ) : (
      <Move move={info} />
    )
  ) : (
    <Loading />
  );
};

export default InfoPage;
