import { AbilityFilter, langFilter } from '../Results/TableFunctions';
import { Link } from 'react-router-dom';

const Ability = ({ ability, version }) => {
  const effectEntries = langFilter(ability.effect_entries);
  const flavorText = AbilityFilter(
    ability.flavor_text_entries,
    version,
    langFilter
  );
  const pokemonList = ability.pokemon.map((poke) => {
    return {
      pokemon: poke.pokemon.name,
      number: poke.pokemon.url.slice(34).split('/'),
      hidden: poke.is_hidden,
    };
  });
  return (
    <div style={{ color: '#f8f9fa', textShadow:"2px 2px #851bed" }}>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ margin: '0px' }}
      >
        <h1 className="display-3 text-center pt-1 pe-1">
          {ability.name.charAt(0).toUpperCase() + ability.name.slice(1)}
        </h1>
      </div>
      <div style={{backgroundColor: 'rgba(0,0,0,.15)'}}>
        <table>
          <tbody className="border">
            <tr className="border-bottom">
              <th>Short Text: </th>
              <th>In-Game Description:</th>
            </tr>
            <tr>
              <td>{`${effectEntries[0].short_effect}`}</td>
              <td>
                {`(${flavorText[0].version_group.name}) ${flavorText[0].flavor_text}`}
              </td>
            </tr>
            <tr className="border-top">
              <th>In-Depth Description:</th>
            </tr>
            <tr>
              <td>{effectEntries[0].effect}</td>
            </tr>
          </tbody>
        </table>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Pokemon</th>
              <th>is hidden?</th>
            </tr>
          </thead>
          <tbody>
            {pokemonList.map((poke) => (
              <tr key={poke.number}>
                <td className='align-middle'>{poke.number}</td>
                <td>
                  <Link to={`/search/${poke.number[0]}`}>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${poke.number[0]}.png`}
                      alt=""
                      style={{
                        // minHeight: 'auto',
                        objectPosition: '0px -.5rem',
                      }}
                    />
                    {poke.pokemon}
                  </Link>
                </td>
                <td>{poke.hidden ? 'yes' : 'no'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ability;
