import './Results.css';
import {
  Moveset,
  Stats,
  Traits,
  Evolutions,
  Header,
  TypeMatchup,
} from './Tables';
import { useState } from 'react';

//fix: convert the number into a name so the search url is more consistent
//fixed: dynamic background based on type
//fix: refactor this place holy
const Results = ({ pokemon, species, evolution, types }) => {
  //this will be pulled from the url of the version group
  const [version, setVersion] = useState('20');
  const type = pokemon.types[0].type.name;
  const type2 = pokemon.types.length > 1 ? pokemon.types[1].type.name : null;
  const id = parseInt(pokemon.species.url.slice(42).split('/'));
  return (
    <div
      className="fade-in-above text-light"
      style={{
        textShadow: '2px 2px #851bed',
      }}
    >
      <Header id={id} pokemon={pokemon} type={type} type2={type2} />
      <hr
        style={{
          border: '1px solid #f8f9fa',
          borderRadius: '2px',
          opacity: '1',
        }}
      />
      <div>
        <div
          className="d-flex justify-content-between border rounded"
          style={{
            background:
              'linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45) ), url(' +
              require(`../../images/types/${type}-bg.png`) +
              ') no-repeat ',
            backgroundPosition: 'center',
            backgroundSize: '100% 100%',
          }}
        >
          <Stats species={species} traits={pokemon} />
          <Traits traits={pokemon} />
          <div
            className="d-flex rounded-circle justify-content-center align-items-center col"
            style={{
              objectFit: 'contain',
              border: '1px solid #851bed',
              background:
                'linear-gradient(rgba(240, 240, 240, 0.35),rgba(15,15,15, 0.35) )',
            }}
          >
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.id}
              className="img-fluid ms-1"
              style={{
                maxHeight: '84%',
              }}
            />
          </div>
        </div>
        <hr
          style={{
            border: '1px solid #f8f9fa',
            borderRadius: '2px',
            opacity: '1',
          }}
        />
        <div className="d-flex justify-content-between">
          <Evolutions evolution={evolution} />
          <TypeMatchup types={types} />
        </div>
        <hr
          style={{
            border: '1px solid #f8f9fa',
            borderRadius: '2px',
            opacity: '1',
          }}
        />
        <div>
          <Moveset moves={pokemon.moves} version={version} />
        </div>
      </div>
    </div>
  );
};

export default Results;
