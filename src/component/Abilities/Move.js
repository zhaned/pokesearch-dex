import {
  AbilityFilter,
  capitalizer,
  langFilter,
} from '../Results/TableFunctions';
import { Link } from 'react-router-dom';

const Move = ({ ability, version }) => {
  const effectEntries = langFilter(ability.effect_entries);
  const flavorText = AbilityFilter(
    ability.flavor_text_entries,
    version,
    langFilter
  );
  const pokemonList = ability.learned_by_pokemon
    .filter((poke) => parseInt(poke.url.slice(34).split('/')) < 899)
    .map((poke) => {
      return {
        pokemon: capitalizer(poke.name),
        number: poke.url.slice(34).split('/'),
      };
    });
  // const tm = ability.machines.filter(
  //   (tm) =>
  //     tm.version_group.url ===
  //     `https://pokeapi.co/api/v2/version-group/${version}/`
  // );
  return (
    <div style={{ color: '#f8f9fa', textShadow: '2px 2px #851bed' }}>
      <h1 className="display-3 text-center pt-1 pe-1">
        {capitalizer(
          ability.name.charAt(0).toUpperCase() + ability.name.slice(1)
        )}
      </h1>
      <div className="table table-dark">
        <table className="border" style={{ width: '100%' }}>
          <thead>
            <tr className="border-bottom">
              <th>Category</th>
              <th>Type</th>
              <th>Atk</th>
              <th>Acc</th>
              <th>PP</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ability.damage_class.name}</td>
              <td>{ability.type.name}</td>
              <td>{ability.power}</td>
              <td>{ability.accuracy}%</td>
              <td>{ability.pp}</td>
              <td>{ability.priority}</td>
            </tr>
          </tbody>
        </table>
        <table className="border border-top-0" style={{ width: '100%' }}>
          <tbody>
            <tr className="border-bottom">
              <th>Short Effect:</th>
              <th>In-Game Description:</th>
            </tr>
            <tr>
              <td
                style={{ minWidth: '40%' }}
              >{`${effectEntries[0].short_effect}`}</td>
              <td>
                {`(${flavorText[0].version_group.name}) ${flavorText[0].flavor_text}`}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="border border-top-0" style={{ width: '100%' }}>
          <tbody>
            <tr className="border-bottom">
              <th>In-depth Effect:</th>
            </tr>
            <tr>{effectEntries[0].effect}</tr>
          </tbody>
        </table>
      </div>
      <hr
        style={{
          border: '1px solid #f8f9fa',
          borderRadius: '2px',
          opacity: '1',
        }}
      />
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Pokemon</th>
          </tr>
        </thead>
        <tbody>
          {pokemonList.map((poke) => (
            <tr key={poke.number}>
              <td>{poke.number}</td>
              <td>
                <Link to={`/search/${poke.number[0]}`}>{poke.pokemon}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Move;
