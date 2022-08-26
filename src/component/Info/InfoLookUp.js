import { useState, useEffect } from 'react';
import Pagination from '../PokeList/Pagination';
import Loading from '../Loading/Loading';
import InfoList from './InfoList';
import SearchBar from '../SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { getInfo } from '../../routes/SearchPage/SearchPageSlice';

const InfoLookUp = ({ infoType }) => {
  const [currentInfo, setCurrentInfo] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [prevPageURL, setPrevPageURL] = useState(null);
  const [nextPageURL, setNextPageURL] = useState(1);
  const [offset, setOffset] = useState(0);

  const { info } = useSelector((state) => state.pokedex);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfo(infoType));
  }, []);

  useEffect(() => {
    setCurrentInfo(info);
  }, [info]);

  useEffect(() => {
    if (currentInfo.length - offset > 60) {
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
    setOffset(offset - 60);
  }
  function goNextPage() {
    setOffset(offset + 60);
  }

  //fix: put in its own file
  function PageNumber({ number, offset, amount }) {
    return (
      <div style={{ color: '#f8f9fa', textShadow: '2px 2px #851bed' }}>
        Page {Math.ceil(offset / amount + 1)} of {Math.ceil(number / amount)}
      </div>
    );
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
        <PageNumber number={currentInfo.length} offset={offset} amount={60} />
        <Pagination
          goPrevPage={prevPageURL && goPrevPage}
          goNextPage={nextPageURL && goNextPage}
        />
      </div>
      {currentInfo ? (
        <InfoList
          info={currentInfo.slice(offset, offset + 60)}
          infoType={infoType}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default InfoLookUp;
