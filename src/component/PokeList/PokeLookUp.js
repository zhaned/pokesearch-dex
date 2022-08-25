import React, { useState, useEffect } from 'react';
import PokeList from './PokeList';
import Pagination from './Pagination';
import Loading from '../Loading/Loading';
import './pokeList.css';
import SearchBar from '../SearchBar';
import { useSelector, useDispatch } from 'react-redux/';
import { getPokedex } from '../../routes/SearchPage/SearchPageSlice';

function PokeLookUp() {
  const [currentList, setCurrentList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [prevPageURL, setPrevPageURL] = useState(null);
  const [nextPageURL, setNextPageURL] = useState(1);
  const [offset, setOffset] = useState(0);

  const { pokedex } = useSelector((state) => state.pokedex);
  const { status } = useSelector((state) => state.pokedex);
  
  const dispatch = useDispatch();
  if (!status) {
    dispatch(getPokedex(1));
  }

  useEffect(() => {
    setCurrentList(pokedex);
  }, [pokedex]);

  useEffect(() => {
    if (currentList.length - offset > 24) {
      setNextPageURL(1);
    } else {
      setNextPageURL(null);
    }

    if (offset > 0) {
      setPrevPageURL(1);
    } else {
      setPrevPageURL(null);
    }
  }, [offset, currentList]);

  function goPrevPage() {
    setOffset(offset - 24);
  }
  function goNextPage() {
    setOffset(offset + 24);
  }
  function PageNumber({ number, offset }) {
    return (
      <div style={{ color: '#f8f9fa', textShadow: '2px 2px #851bed' }}>
        Page {Math.ceil(offset / 24 + 1)} of {Math.ceil(number / 24)}
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between mb-1">
        <SearchBar
          setOffset={setOffset}
          setInputValue={setInputValue}
          setCurrentList={setCurrentList}
          inputValue={inputValue}
          info={pokedex}
        />
        <PageNumber number={currentList.length} offset={offset} />
        <Pagination
          goPrevPage={prevPageURL ? goPrevPage : null}
          goNextPage={nextPageURL ? goNextPage : null}
        />
      </div>
      {currentList ? (
        <PokeList pokemon={currentList.slice(offset, offset + 24)} />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default PokeLookUp;
