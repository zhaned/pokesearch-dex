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
    <div style={{color: 'white'}}>
      {ability.name}
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
      {pokemonList.map((poke) => {
        return (
          <div>
            {poke.number}: {poke.pokemon}
          </div>
        )
      })}
    </div>
  );
};

export default Move;
