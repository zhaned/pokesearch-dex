import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { TypeColor, TypeNames } from '../Type';
import {
  regionFilter,
  langFilter,
  capitalizer,
  capsChecker,
  heightConverter,
  statRenamer,
  moveFilter,
  levelGetter,
  updateLocation,
  TypeMultiplyer,
} from './TableFunctions';
import './Results.css';

export const Stats = ({ species, traits }) => {
  //fix: height near 12 inches aren't converted (.3m becomes 0"12)
  // const height = (traits.height * 10) / 2.54 / 12; // in ft
  const height = traits.height / 10;
  const weight = Math.round(2.20462 * traits.weight) / 10; // in lbs
  const description = regionFilter(langFilter(species.flavor_text_entries));
  return (
    <table className="col border-end">
      <tbody>
        <tr>
          <th>Description: </th>
          <td>
            {
              `(${capitalizer(description.version.name)}): ${capsChecker(
                description.flavor_text
              )} `
              // species.flavor_text_entries[0].flavor_text
            }
          </td>
        </tr>
        <tr>
          <th>Height:</th>
          <td>
            {heightConverter(height)} ({height} m)
          </td>
        </tr>
        <tr>
          <th>Weight:</th>
          <td>
            {weight} lbs ({traits.weight / 10} kg)
          </td>
        </tr>
        <tr>
          <th>Capture Rate: </th>
          <td>{species.capture_rate}</td>
        </tr>
        <tr>
          <th>Egg Groups: </th>
          <td>{species.egg_groups.map((group) => group.name + ' | ')}</td>
        </tr>
        <tr>
          <th>Base Egg Cycle: </th>
          <td>
            {species.hatch_counter} cycles ({species.hatch_counter * 256} steps)
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export const Traits = ({ traits }) => {
  const ability = traits.abilities;
  const stats = traits.stats;
  const ev = capitalizer(
    stats
      .filter((stat) => stat.effort > 0)
      .map((data) => {
        return data.stat.name + ': ' + data.effort;
      })
      .join(', ')
  );

  return (
    <table className="col border-end">
      <tbody>
        <tr>
          <th>Abilities</th>
        </tr>
        <tr>
          {ability.map((ability) =>
            ability.is_hidden === false ? (
              <td className="pe-1" key={ability.ability.name}>
                <Link
                  className="stat-name"
                  to={`/abilities/${ability.ability.name}`}
                >
                  {capitalizer(ability.ability.name)}
                </Link>
              </td>
            ) : null
          )}
        </tr>
        <tr>
          <td style={{ fontStyle: 'italic' }}>Hidden:</td>
          {ability.map((ability) =>
            ability.is_hidden === true ? (
              <td key={ability.ability.name}>
                <Link
                  className="stat-name"
                  to={`/abilities/${ability.ability.name}`}
                >
                  {capitalizer(ability.ability.name)}
                </Link>
              </td>
            ) : null
          )}
        </tr>
        <tr>
          <th>Effort Values:</th>
          <td>{ev}</td>
        </tr>
      </tbody>
      <tbody>
        {stats.map((stat) => (
          <Fragment key={stat.stat.name}>
            <tr
            // style={{height: '28px'}}
            >
              <th
                className="border border-bottom-0 px-1"
                style={{ backgroundColor: 'rgba(0,0,0,.15)' }}
              >
                <div title={capitalizer(stat.stat.name)}>
                  {statRenamer(stat.stat.name)}
                </div>
              </th>
              <td
                style={{
                  width: '100%',
                }}
              >
                <div
                  className="stat-visuals rounded-end border border-start-0"
                  style={{
                    width: `${stat.base_stat / 2}%`,
                    minWidth: `${stat.base_stat < 10 ? '5%' : '7%'}`,
                  }}
                >
                  {stat.base_stat}
                </div>
              </td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export const Moveset = ({ moves, version }) => {
  const [moveInfo, setMoveInfo] = useState();

  //fix: dynamically choose version and learn method
  const moveList = moveFilter(moves, version, 'level-up');
  const getMoveInfo = async () => {
    const url = moveList.map((move) =>
      fetch(move.move.url).then((res) => res.json())
    );
    const responses = await Promise.all(url);
    setMoveInfo(responses);
  };

  useEffect(() => {
    getMoveInfo();
  }, []);
  //fix: get moves from a single generation
  //fix: order moves via level up
  return moveInfo ? (
    <table className="table table-dark table-hover">
      <thead className="text-center move-thead">
        <tr>
          <th>
            <h4>Moves</h4>
          </th>
        </tr>
      </thead>
      <tbody className="move-tbody">
        <tr className="text-start border-bottom">
          <th>Level</th>
          <th>Name</th>
          <th>Category</th>
          <th>Type</th>
          <th>Atk</th>
          <th>Acc</th>
          <th>PP</th>
        </tr>
        {moveInfo.map((move, index) => (
          <Fragment key={move.name}>
            <tr>
              <td>
                {levelGetter(moveList[index], version) === 0
                  ? 'Evolve'
                  : levelGetter(moveList[index], version) === 1
                  ? '-'
                  : levelGetter(moveList[index], version)}
              </td>
              <td>
                <Link className="stat-name" to={`/moves/${move.name}`}>
                  {capitalizer(move.name)}
                </Link>
              </td>
              <td>
                <img
                  className="d-flex"
                  src={require(`../../images/damage-classes/${move.damage_class.name}-icon.png`)}
                  alt=""
                  title={capitalizer(move.damage_class.name)}
                />
              </td>
              <td>
                <span
                  className="border rounded p-1"
                  style={{ backgroundColor: TypeColor(move.type.name) }}
                >
                  {capitalizer(move.type.name)}
                </span>
              </td>
              <td>{move.power ? move.power : '-'}</td>
              <td>{move.accuracy ? `${move.accuracy}%` : '-'}</td>
              <td>{move.pp}</td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  ) : (
    <Loading />
  );
};

export const Evolutions = ({ evolution }) => {
  //fix: include requirement for evolving b/t species
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-wrap align-items-center">
      {evolution.chain.evolves_to[0] ? (
        evolution.chain.evolves_to[0].evolves_to[0] ? (
          <>
            <Link
              to={`/search/${parseInt(
                evolution.chain.species.url.slice(42).split('/')
              )}`}
              onClick={() =>
                updateLocation(
                  navigate,
                  `/search/${parseInt(
                    evolution.chain.species.url.slice(42).split('/')
                  )}`
                )
              }
              className="d-flex flex-column m-2  text-center"
              style={{
                width: '10rem',
                height: 'auto',
              }}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseInt(
                  evolution.chain.species.url.slice(42).split('/')
                )}.png`}
                alt=""
              />
              {capitalizer(evolution.chain.species.name)}
            </Link>
            <div className="d-flex align-items-center flex-column">
              {evolution.chain.evolves_to.map((evo) => (
                <div className="d-flex align-items-center" key={evo.species.name}>
                  {' -> '}
                  <Link
                    to={`/search/${parseInt(
                      evo.species.url
                        .slice(42)
                        .split('/')
                    )}`}
                    onClick={() =>
                      updateLocation(
                        navigate,
                        `/search/${parseInt(
                          evo.species.url
                            .slice(42)
                            .split('/')
                        )}`
                      )
                    }
                    className="d-flex flex-column m-2  text-center"
                    style={{
                      width: '10rem',
                      height: 'auto',
                    }}
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseInt(
                        evo.species.url
                          .slice(42)
                          .split('/')
                      )}.png`}
                      alt=""
                    />
                    {capitalizer(
                      evo.species.name
                    )}
                  </Link>
                </div>
              ))}
            </div>
            <div className="d-flex align-items-center flex-column">
            {evolution.chain.evolves_to[0].evolves_to.map((evo) => (
            <div className="d-flex align-items-center" key={evo.species.name}>
              {' -> '}
              <Link
                to={`/search/${parseInt(
                  evo.species.url
                    .slice(42)
                    .split('/')
                )}`}
                onClick={() =>
                  updateLocation(
                    navigate,
                    `/search/${parseInt(
                      evo.species.url
                        .slice(42)
                        .split('/')
                    )}`
                  )
                }
                className="d-flex flex-column m-2  text-center"
                style={{
                  width: '10rem',
                  height: 'auto',
                }}
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseInt(
                    evo.species.url
                      .slice(42)
                      .split('/')
                  )}.png`}
                  alt=""
                />
                {capitalizer(
                  evo.species.name
                )}
              </Link>
            </div>
            ))}
            </div>
          </>
        ) : (
          <>
            <Link
              to={`/search/${parseInt(
                evolution.chain.species.url.slice(42).split('/')
              )}`}
              onClick={() =>
                updateLocation(
                  navigate,
                  `/search/${parseInt(
                    evolution.chain.species.url.slice(42).split('/')
                  )}`
                )
              }
              className="d-flex flex-column m-2  text-center"
              style={{
                width: '10rem',
                height: 'auto',
              }}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseInt(
                  evolution.chain.species.url.slice(42).split('/')
                )}.png`}
                alt=""
              />
              {capitalizer(evolution.chain.species.name)}
            </Link>
            <div className="d-flex align-items-center flex-column">
              {evolution.chain.evolves_to.map((evo) => (
                <div className="d-flex align-items-center" key={evo.species.name}>
                  {' -> '}
                  <Link
                    to={`/search/${parseInt(
                      evo.species.url
                        .slice(42)
                        .split('/')
                    )}`}
                    onClick={() =>
                      updateLocation(
                        navigate,
                        `/search/${parseInt(
                          evo.species.url
                            .slice(42)
                            .split('/')
                        )}`
                      )
                    }
                    className="d-flex flex-column m-2  text-center"
                    style={{
                      width: '10rem',
                      height: 'auto',
                    }}
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseInt(
                        evo.species.url
                          .slice(42)
                          .split('/')
                      )}.png`}
                      alt=""
                    />
                    {capitalizer(
                      evo.species.name
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </>
        )
      ) : (
        <Link
          to={`/search/${parseInt(
            evolution.chain.species.url.slice(42).split('/')
          )}`}
          onClick={() =>
            updateLocation(
              navigate,
              `/search/${parseInt(
                evolution.chain.species.url.slice(42).split('/')
              )}`
            )
          }
          className="d-flex flex-column m-2  text-center"
          style={{
            width: '10rem',
            height: 'auto',
          }}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseInt(
              evolution.chain.species.url.slice(42).split('/')
            )}.png`}
            alt=""
          />
          {capitalizer(evolution.chain.species.name)}
          {' does not evolve'}
        </Link>
      )}
    </div>
  );
};

export const Header = ({ id, pokemon, type, type2 }) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex align-items-center">
        {/* fix: add the previous pokemon as a link here with a sprite */}
        {id === 1 ? null : (
          <Link
            to={`/search/${id - 1}`}
            onClick={() => updateLocation(navigate, `/search/${id - 1}`)}
          >
            <h3 className="next-sprite">
              <span style={{ verticalAlign: 'bottom' }}>&lt;</span>
              <img
                className="img-fluid"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${
                  id - 1
                }.png`}
                alt=""
              />
            </h3>
          </Link>
        )}
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ margin: '0px' }}
      >
        <h1 className="display-3 text-center pt-1 pe-1">
          #{id} {/*fixed: change this to get the id from species.url later*/}
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h1>
        <p className="d-flex align-items-end px-1 mt-3">
          <span
            className="border rounded px-1 me-1"
            style={{ backgroundColor: TypeColor(type) }}
          >
            {type}
          </span>{' '}
          {type2 !== null ? (
            <span
              className="border rounded px-1"
              style={{ backgroundColor: TypeColor(pokemon.types[1].type.name) }}
            >
              {pokemon.types[1].type.name}
            </span>
          ) : null}
        </p>
      </div>
      <div className="d-flex align-items-center">
        {/* fix: add the next pokemon as a link here with a sprite */}
        {id === 898 ? null : (
          <Link
            to={`/search/${id + 1}`}
            onClick={() => updateLocation(navigate, `/search/${id + 1}`)}
          >
            <h3 className="next-sprite">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${
                  id + 1
                }.png`}
                alt=""
              />
              <span style={{ verticalAlign: 'bottom' }}>&gt;</span>
            </h3>
          </Link>
        )}
      </div>
    </div>
  );
};

export const TypeMatchup = ({ types }) => {
  const pokemonTypes = types;
  const matchups = TypeMultiplyer(pokemonTypes, TypeNames);
  return (
    <div>
      <h4 className="text-center">Type Matchup</h4>
      <table className="table m-0 tester" style={{ color: '#f8f9fa' }}>
        <tbody>
          <tr>
            <th>4x damage:</th>
            <td>
              {matchups.quadruple.map((type) => (
                <span
                  className="border rounded p-1 me-1"
                  style={{ backgroundColor: TypeColor(type) }}
                  key={type}
                >
                  {capitalizer(type)}
                </span>
              ))}
            </td>
          </tr>
          <tr>
            <th>2x damage:</th>
            <td>
              {matchups.double.map((type) => (
                <span
                  className="border rounded p-1 me-1"
                  style={{ backgroundColor: TypeColor(type) }}
                  key={type}
                >
                  {capitalizer(type)}
                </span>
              ))}
            </td>
          </tr>
          <tr>
            <th>1x damage:</th>
            <td
              className="d-flex flex-wrap"
              style={{
                maxWidth: '24vw',
              }}
            >
              {matchups.neutral.map((type) => (
                <span
                  className="border rounded p-1 mb-1 me-1"
                  style={{ backgroundColor: TypeColor(type) }}
                  key={type}
                >
                  {capitalizer(type)}
                </span>
              ))}
            </td>
          </tr>
          <tr>
            <th>1/2 damage:</th>
            <td>
              {' '}
              {matchups.half.map((type) => (
                <span
                  className="border rounded p-1 me-1"
                  style={{ backgroundColor: TypeColor(type) }}
                  key={type}
                >
                  {capitalizer(type)}
                </span>
              ))}
            </td>
          </tr>
          <tr>
            <th>1/4 damage:</th>
            <td>
              {' '}
              {matchups.quarter.map((type) => (
                <span
                  className="border rounded p-1 me-1"
                  style={{ backgroundColor: TypeColor(type) }}
                  key={type}
                >
                  {capitalizer(type)}
                </span>
              ))}
            </td>
          </tr>
          <tr>
            <th>No damage:</th>
            <td>
              {' '}
              {matchups.no.map((type) => (
                <span
                  className="border rounded p-1 me-1"
                  style={{ backgroundColor: TypeColor(type) }}
                  key={type}
                >
                  {capitalizer(type)}
                </span>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
