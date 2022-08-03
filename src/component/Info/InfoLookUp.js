import { useState, useEffect } from 'react';
import Pagination from '../PokeList/Pagination';
import Loading from '../Loading/Loading';
import InfoList from './InfoList';
import SearchBar from '../SearchBar';

const InfoLookUp = ({ infoType }) => {
  const [currentInfo, setCurrentInfo] = useState();
  const [inputValue, setInputValue] = useState('');
  const [info, setInfo] = useState();
  const [currentPageURL, setCurrentPageURL] = useState(
    `http://localhost:3001/${infoType}`
  );
  const [prevPageURL, setPrevPageURL] = useState();
  const [nextPageURL, setNextPageURL] = useState();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetch(currentPageURL)
      .then((res) => res.json())
      .then((data) => {
        setNextPageURL(data.next);
        setPrevPageURL(data.previous);
        setInfo(data.results.map((p) => ({ name: p.name, url: p.url })));
        setCurrentInfo(data.results.map((p) => ({ name: p.name, url: p.url })));
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
      <div className="d-flex justify-content-between mb-1">
        <SearchBar
          setOffset={setOffset}
          setInputValue={setInputValue}
          setCurrentList={setCurrentInfo}
          inputValue={inputValue}
          info={info}
        />
        <Pagination
          goPrevPage={prevPageURL ? goPrevPage : null}
          goNextPage={nextPageURL ? goNextPage : null}
        />
      </div>
      {info ? (
        <InfoList info={currentInfo.slice(offset, offset + 70)} infoType={infoType} />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default InfoLookUp;
