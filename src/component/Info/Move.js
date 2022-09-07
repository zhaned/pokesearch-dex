import { capitalizer } from '../Results/TableFunctions';
import { MoveInfo, PokemonTable } from '../Results/Tables';
import { useEffect } from 'react';
import HrLineBreak from '../HrLineBreak';

const Move = ({ move }) => {
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
      <h1 className="display-3 text-center pt-1 pe-1" id="title">
        {capitalizer(move.name.charAt(0).toUpperCase() + move.name.slice(1))}
      </h1>
      <HrLineBreak />
      <MoveInfo move={move} />
      <HrLineBreak />
      <table className="table table-dark m-0">
        <thead className="text-center move-thead">
          <tr>
            <th>
              <h4>Pokémon That Can Learn This Move</h4>
            </th>
          </tr>
        </thead>
      </table>
      {pokemonList.length > 0 && <PokemonTable list={pokemonList} />}
    </div>
  );
};

export default Move;
