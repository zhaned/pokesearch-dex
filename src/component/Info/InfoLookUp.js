import { useState, useEffect } from 'react';
import Pagination from '../PokeList/Pagination';
import Loading from '../Loading/Loading';
import InfoList from './InfoList';

const InfoLookUp = ({ infoType }) => {
  const [info, setInfo] = useState();
  const [currentPageURL, setCurrentPageURL] = useState(
    `http://localhost:3001/${infoType}`
  );
  const [prevPageURL, setPrevPageURL] = useState();
  const [nextPageURL, setNextPageURL] = useState();

  useEffect(() => {
    fetch(currentPageURL)
      .then((res) => res.json())
      .then((data) => {
        setNextPageURL(data.next);
        setPrevPageURL(data.previous);
        setInfo(data.results.map((p) => [p.name, p.url]));
      });
  }, [currentPageURL]);

  function goPrevPage() {
    setCurrentPageURL(prevPageURL);
  }
  function goNextPage() {
    setCurrentPageURL(nextPageURL);
  }

  return (
    <div>
      <Pagination
        goPrevPage={prevPageURL ? goPrevPage : null}
        goNextPage={nextPageURL ? goNextPage : null}
      />
      {info ? <InfoList info={info} infoType={infoType} /> : <Loading />}
    </div>
  );
};

export default InfoLookUp;
