import { capitalizer } from '../Results/TableFunctions';
import { MoveInfo, PokemonTable } from '../Results/Tables';
import { useEffect } from 'react';

const Move = ({ move, version }) => {
  const pokemonList = move.learned_by_pokemon
    .filter((poke) => parseInt(poke.url.slice(34).split('/')) < 899)
    .map((poke) => {
      return {
        pokemon: capitalizer(poke.name),
        number: poke.url.slice(34).split('/'),
      };
    });
  useEffect(() => {
    document.title = document.getElementById('title').innerText;
  }, []);
  return (
    <div style={{ color: '#f8f9fa', textShadow: '2px 2px #851bed' }}>
      <h1 className="display-3 text-center pt-1 pe-1" id='title'>
        {capitalizer(move.name.charAt(0).toUpperCase() + move.name.slice(1))}
      </h1>
      <div className="table table-dark">
        <MoveInfo move={move} version={version} />
      </div>
      <hr
        style={{
          border: '1px solid #f8f9fa',
          borderRadius: '2px',
          opacity: '1',
        }}
      />
      <table className="table table-dark m-0">
        <thead className="text-center move-thead">
          <tr>
            <th>
              <h4>Pokemon That Can Learn This Move</h4>
            </th>
          </tr>
        </thead>
      </table>
      <PokemonTable list={pokemonList} />
    </div>
  );
};

export default Move;
