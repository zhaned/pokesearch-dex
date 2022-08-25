import { useState, useEffect } from 'react';
import Pagination from '../PokeList/Pagination';
import Loading from '../Loading/Loading';
import InfoList from './InfoList';
import SearchBar from '../SearchBar';

const InfoLookUp = ({ infoType }) => {
  const [info, setInfo] = useState();
  const [currentInfo, setCurrentInfo] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [prevPageURL, setPrevPageURL] = useState(null);
  const [nextPageURL, setNextPageURL] = useState(1);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3001/${infoType}`)
      .then((res) => res.json())
      .then((data) => {
        setInfo(data.results.map((p) => ({ name: p.name, url: p.url })));
        setCurrentInfo(data.results.map((p) => ({ name: p.name, url: p.url })));
      });
  }, [infoType]);

  useEffect(() => {
    if (currentInfo.length - offset > 70) {
      setNextPageURL(1);
    } else {
      setNextPageURL(null);
    }

    if (offset > 0) {
      setPrevPageURL(1);
    } else {
      setPrevPageURL(null);
    }
  }, [offset, currentInfo]);

  function goPrevPage() {
    setOffset(offset - 70);
  }
  function goNextPage() {
    setOffset(offset + 70);
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
          goPrevPage={prevPageURL && goPrevPage}
          goNextPage={nextPageURL && goNextPage}
        />
      </div>
      {info ? (
        <InfoList
          info={currentInfo.slice(offset, offset + 70)}
          infoType={infoType}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default InfoLookUp;
