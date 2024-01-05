import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/';
import { getPokemon } from './homepageSlice';
import PokeCycler from '../../component/PokeCycler/PokeCycler';
import ButtonIcon from '../../component/ButtonIcon';
import './Homepage.css';

const Homepage = () => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon.list);
  const status = useSelector((state) => state.pokemon.status);
  // +1 because the result cannot be 0
  let pokeNumber = Math.floor(Math.random() * 1016 + 1);
  let pokeNumber2 = Math.floor(Math.random() * 1016 + 1);

  if (status === null || status === 'failed') {
    dispatch(getPokemon());
  }
    
  useEffect(() => {
    document.title = 'PokéSearch Dex';
  }, []);
  
  return (
    <div>
      <h1
        className="display-3 text-center"
        style={{
          color: '#f8f9fa',
          textShadow: '2px 2px #851bed',
          paddingTop: '4rem',
        }}
      >
        Welcome to PokéSearch Dex!
      </h1> 
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ marginTop: '5%' }}
      >
        {pokemon ? (
          <PokeCycler pokeNumber={pokeNumber} side={'left'} list={pokemon} />
        ) : null}
        <div
          style={{
            textShadow: '2px 2px #851bed',
          }}
        >
          <ButtonIcon
            number={1}
            location={'search'}
            text={'Look up Pokémon now!'}
            btn={'btn-danger'}
          />
          <ButtonIcon
            number={109}
            location={'ability'}
            text={'... or abilities'}
            btn={'btn-success'}
          />
          <ButtonIcon
            number={251}
            location={'move'}
            text={'... or even moves!'}
            btn={'btn-primary'}
          />
        </div>
        {pokemon ? (
          <PokeCycler pokeNumber={pokeNumber2} side={'right'} list={pokemon} />
        ) : null}
      </div>
    </div>
  );
};

export default Homepage;
