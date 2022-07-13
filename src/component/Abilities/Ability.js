import { AbilityFilter, capitalizer, langFilter } from '../Results/TableFunctions';
import { Link } from 'react-router-dom';

const Ability = ({ ability, version }) => {
  const effectEntries = langFilter(ability.effect_entries);
  const flavorText = AbilityFilter(
    ability.flavor_text_entries,
    version,
    langFilter
  );
  const pokemonList = ability.pokemon.filter((poke) => parseInt(poke.pokemon.url.slice(34).split('/')) < 899).map((poke) => {
    return {
      pokemon: capitalizer(poke.pokemon.name),
      number: poke.pokemon.url.slice(34).split('/'),
      hidden: poke.is_hidden,
    };
  });
  return (
    <div style={{ color: '#f8f9fa', textShadow: '2px 2px #851bed' }}>
      <h1 className="display-3 text-center pt-1 pe-1">
        {capitalizer(ability.name.charAt(0).toUpperCase() + ability.name.slice(1))}
      </h1>
      <div>
        <div className='table table-dark'>
          <table className="border" style={{ width: '100%' }}>
            <tbody>
              <tr className="border-bottom">
                <th >Short Description: </th>
                <th>In-Game Description:</th>
              </tr>
              <tr>
                <td className='pe-1'>{`${effectEntries[0] ? effectEntries[0].short_effect : '-'}`}</td>
                <td>
                  {`(${flavorText[0].version_group.name}) ${flavorText[0].flavor_text}`}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="border border-top-0" style={{ width: '100%' }}>
            <tbody>
              <tr className="border-bottom">
                <th>In-Depth Description:</th>
              </tr>
              <tr>
                <td>{effectEntries[0] ? effectEntries[0].effect : '-'}</td>
              </tr>
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
              <table className="table table-dark m-0">
        <thead className="text-center move-thead">
          <tr>
            <th>
              <h4>Pokemon With This Ability</h4>
            </th>
          </tr>
        </thead>
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
                <td className="align-middle">{poke.number}</td>
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
                <td className='align-middle'>{poke.hidden ? 'yes' : 'no'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ability;
