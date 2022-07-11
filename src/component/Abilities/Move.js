import { capitalizer } from '../Results/TableFunctions';
import { Link } from 'react-router-dom';
import { MoveInfo } from '../Results/Tables';

const Move = ({ ability, version }) => {
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
        <MoveInfo ability={ability} version={version} />
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
                <Link to={`/search/${poke.number[0]}`}>                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${poke.number[0]}.png`}
                      alt=""
                      style={{
                        // minHeight: 'auto',
                        objectPosition: '0px -.5rem',
                      }}
                    />{poke.pokemon}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Move;
