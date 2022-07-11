import {
  AbilityFilter,
  capitalizer,
  langFilter,
} from '../Results/TableFunctions';

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
      <br />
      {effectEntries[0].effect + effectEntries[0].short_effect}
      <br />
      {`(${flavorText[0].version_group.name}) ${flavorText[0].flavor_text}`}
      <br />
      {ability.damage_class.name}
      <br />
      {ability.type.name}
      <br />
      pp{ability.pp}
      <br />
      power{ability.power}
      <br />
      accuracy{ability.accuracy}
      <br />
      priority{ability.priority}
      <br />
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Pokemon</th>
          </tr>
        </thead>
        <tbody>
          {pokemonList.map((poke) => (
            <tr>
              <td>{poke.number}</td>
              <td>{poke.pokemon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Move;
