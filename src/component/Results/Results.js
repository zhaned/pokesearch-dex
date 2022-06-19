import './Results.css';
import { Moveset } from './Tables';
//fix: convert the number into a name so the search url is more consistent
//fixed: dynamic background based on type
//fix: refactor this place holy
const Results = ({ pokemon }) => {
  const type = pokemon.types[0].type.name;
  const type2 = pokemon.types.length;
  const ability = pokemon.abilities[0].ability.name;
  const ability2 = pokemon.abilities.length;
  const heightM = pokemon.height / 10; //needs more conversions to get ft'in
  const weightLbs = Math.round(2.20462 * (pokemon.weight / 10) * 10) / 10;
  return (
    <div className="fade-in-above text-light">
      <div className="d-flex justify-content-center">
        <h1 className="display-3 text-center pt-1 pe-1">
          #{pokemon.id}{' '}
          {/*fix: change this to get the id from species.url later*/}{' '}
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h1>
        <p className="d-flex align-items-end px-1">
          {type} {type2 === 2 ? pokemon.types[1].type.name : null}
        </p>
      </div>
      <hr
        style={{
          border: '1px solid #f0f0f0',
          borderRadius: '2px',
          opacity: '1',
        }}
      />
      <div
        className="d-flex justify-content-between"
        style={{
          background:
            'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(' +
            require(`../../images/types/${type}-bg.png`) +
            ') no-repeat ',
          backgroundPosition: 'center',
          backgroundSize: '100% 100%',
          textShadow: '2px 2px #851bed',
        }}
      >
        <div>
          <table>
            <tbody>
              <tr>
                <th>Ablities</th>
                <td>{ability}</td>
                <td>
                  {ability2 > 1 ? pokemon.abilities[1].ability.name : null}
                </td>
              </tr>
              <tr>
                <th>Height</th>
                <td>{heightM} m</td>
              </tr>
              <tr>
                <th>Weight</th>
                <td>{weightLbs} lbs</td>
              </tr>
            </tbody>
          </table>
        </div>
        <table>
          <tbody>
            <tr>
              <th>{pokemon.stats[0].stat.name}</th>
              <td>{pokemon.stats[0].base_stat}</td>
            </tr>
            <tr>
              <th>{pokemon.stats[1].stat.name}</th>
              <td>{pokemon.stats[1].base_stat}</td>
            </tr>
            <tr>
              <th>{pokemon.stats[2].stat.name}</th>
              <td>{pokemon.stats[2].base_stat}</td>
            </tr>
            <tr>
              <th>{pokemon.stats[3].stat.name}</th>
              <td>{pokemon.stats[3].base_stat}</td>
            </tr>
            <tr>
              <th>{pokemon.stats[4].stat.name}</th>
              <td>{pokemon.stats[4].base_stat}</td>
            </tr>
            <tr>
              <th>{pokemon.stats[5].stat.name}</th>
              <td>{pokemon.stats[5].base_stat}</td>
            </tr>
          </tbody>
        </table>
        <div
          className="d-flex rounded-circle justify-content-center align-items-center"
          style={{
            objectFit: 'contain',
            border: '1px solid #851bed',
            background:
              'linear-gradient(rgba(240, 240, 240, 0.35),rgba(15,15,15, 0.35) )',
          }}
        >
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.id}
            className="img-fluid ms-1"
            style={{
              maxHeight: '84%',
            }}
          />
        </div>
      </div>
        <Moveset moves={pokemon.moves} />
    </div>
  );
};

export default Results;
