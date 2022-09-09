import './Results.css';
import {
  Traits,
  Stats,
  Evolutions,
  Header,
  TypeMatchup,
  MoveTabs,
  Description,
} from './Tables';
import { useEffect } from 'react';
import HrLineBreak from '../HrLineBreak';

const Results = ({ pokemon, species, evolution, types }) => {
  const type = pokemon.types[0].type.name;
  const type2 = pokemon.types.length > 1 ? pokemon.types[1].type.name : null;
  const id = parseInt(pokemon.species.url.slice(42).split('/'));

  useEffect(() => {
    document.title = document.getElementById('title').innerText;
  }, [id]);

  return (
    <div
      className="fade-in-above text-light"
      key={id}
      style={{
        textShadow: `2px 2px #851bed`,
      }}
    >
      <Header id={id} pokemon={pokemon} type={type} type2={type2} />
      <HrLineBreak />
      <div>
        <div
          className="border rounded"
          style={{
            background:
              'linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45) ), url(' +
              require(`../../images/types/${type}-bg.png`) +
              ') no-repeat center/100% 100%',
          }}
        >
          <div className="d-flex justify-content-between">
            <Traits species={species} data={pokemon} />
            <Stats data={pokemon} />
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
                alt={'(not currently available)'}
                className="img-fluid ms-1"
                style={{
                  maxHeight: '84%',
                }}
              />
            </div>
          </div>
          <Description data={species} />
        </div>
        <HrLineBreak />
        <div className="d-flex justify-content-between">
          <Evolutions evolution={evolution} />
          <TypeMatchup types={types} />
        </div>
        <HrLineBreak />
        <MoveTabs pokemon={pokemon} />
      </div>
    </div>
  );
};

export default Results;
