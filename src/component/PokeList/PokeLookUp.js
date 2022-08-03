import React, { useState, useEffect } from 'react';
import PokeList from './PokeList';
import Pagination from './Pagination';
import Loading from '../Loading/Loading';
import './pokeList.css';
import SearchBar from '../SearchBar';

function PokeLookUp() {
  const [pokemon, setPokemon] = useState();
  const [currentList, setCurrentList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [prevPageURL, setPrevPageURL] = useState(null);
  const [nextPageURL, setNextPageURL] = useState(1);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3001/pokemon')
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data.results.map((p) => ({ name: p.name, url: p.url })));
        setCurrentList(data.results.map((p) => ({ name: p.name, url: p.url })));
      });
  }, []);

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

  return (
    <div>
      <div className="d-flex justify-content-between mb-1">
        <SearchBar
          setOffset={setOffset}
          setInputValue={setInputValue}
          setCurrentList={setCurrentList}
          inputValue={inputValue}
          info={pokemon}
        />
        <Pagination
          goPrevPage={prevPageURL ? goPrevPage : null}
          goNextPage={nextPageURL ? goNextPage : null}
        />
      </div>
      {pokemon ? (
        <PokeList pokemon={currentList.slice(offset, offset + 24)} />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default PokeLookUp;
