import { useState, useEffect } from 'react';
import Pagination from '../Search/Pagination';
import Loading from '../Loading/Loading';
import InfoList from './InfoList';
import SearchBar from '../Search/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { getInfo } from '../../routes/SearchPage/SearchPageSlice';
import { PageNumber } from '../Search/PageNumber';

const InfoLookUp = ({ infoType }) => {
  const [currentInfo, setCurrentInfo] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [offset, setOffset] = useState(0);

  const { info } = useSelector((state) => state.pokedex);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfo(infoType));
  }, []);

  useEffect(() => {
    setCurrentInfo(info);
    setOffset(0);
  }, [info]);

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
        <PageNumber number={currentInfo} offset={offset} offsetAmount={60} />
        <Pagination
          currentInfo={currentInfo}
          offset={offset}
          setOffset={setOffset}
          offsetAmount={60}
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
