import React, { useState, useEffect } from 'react';
import PokeList from './PokeList';
import Pagination from './Pagination';
import Loading from '../Loading/Loading';
import './pokeList.css';
import SearchBar from '../SearchBar';

function PokeLookUp() {
  const [currentList, setCurrentList] = useState();
  const [pokemon, setPokemon] = useState();
  const [inputValue, setInputValue] = useState('');
  const [currentPageURL, setCurrentPageURL] = useState(
    'http://localhost:3001/pokemon'
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
        setPokemon(data.results.map((p) => ({ name: p.name, url: p.url })));
        setCurrentList(data.results.map((p) => ({ name: p.name, url: p.url })));
      });
  }, [currentPageURL]);

  function goPrevPage() {
    setCurrentPageURL(prevPageURL);
  }
  function goNextPage() {
    setCurrentPageURL(nextPageURL);
  }

  /*
  - pull all the data in
  - send all into pokelist
  - set an amount to be displayed on the browser
  - when search is updated, offset resets back to 0
  */

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
