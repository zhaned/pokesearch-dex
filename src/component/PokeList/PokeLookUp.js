import React, { useState, useEffect, useRef } from 'react';
import PokeList from './PokeList';
import Pagination from '../Search/Pagination';
import Loading from '../Loading/Loading';
import './pokeList.css';
import SearchBar from '../Search/SearchBar';
import { useSelector, useDispatch } from 'react-redux/';
import {
  getPokedex,
  getAllPokemon,
} from '../../routes/SearchPage/SearchPageSlice';
import { PageNumber } from '../Search/PageNumber';

function PokeLookUp() {
  const [currentList, setCurrentList] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [offset, setOffset] = useState(0);

  const { allPokemon } = useSelector((state) => state.pokedex);
  const { pokedex } = useSelector((state) => state.pokedex);
  const { id } = useSelector((state) => state.pokedex);
  const { status } = useSelector((state) => state.pokedex);
  const { allStatus } = useSelector((state) => state.pokedex);
  const dispatch = useDispatch();
  const firstUpdate = useRef(status);

  if (!allStatus) {
    dispatch(getAllPokemon());
  }
  useEffect(() => {
    if (firstUpdate.current !== 'success') {
      dispatch(getPokedex(id || 1, allPokemon));
    } else {
      return;
    }
  }, [allPokemon]);

  useEffect(() => {
    setCurrentList(pokedex);
    setOffset(0);
  }, [pokedex]);

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
        <PageNumber number={currentList} offset={offset} offsetAmount={24} />
        <Pagination
          currentInfo={currentList}
          offset={offset}
          setOffset={setOffset}
          offsetAmount={24}
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
