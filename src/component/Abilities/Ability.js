import { AbilityFilter, langFilter } from '../Results/TableFunctions';

const Ability = ({ ability, version }) => {
  const effectEntries = langFilter(ability.effect_entries);
  const flavorText = AbilityFilter(ability.flavor_text_entries, version, langFilter)
  const pokemonList = ability.pokemon.map((poke) => {
    return {pokemon: poke.pokemon.name, number: poke.pokemon.url.slice(34).split('/'), hidden: poke.is_hidden}
  })
  console.log(pokemonList);
  return (
    <div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ margin: '0px' }}
      >
        <h1 className="display-3 text-center pt-1 pe-1">
          {ability.name.charAt(0).toUpperCase() + ability.name.slice(1)}
        </h1>
      </div>
      <div style={{ color: 'white' }}>
        THings I need to havbe on this page:
        <ul>
          <li>Name: done</li>
          <li>effect entries, the correct language, effect, short effect: done</li>
          <li>flavor text entry, region and language filter: done</li>
          <li>Pokemon that can learn it</li>
          <li>for pokemon, is it hidden</li>
        </ul>
      </div>

    </div>
  );
};

export default Ability;
