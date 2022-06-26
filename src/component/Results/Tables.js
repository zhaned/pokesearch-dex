import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import Type from '../Type';
import {
  regionFilter,
  langFilter,
  capitalizer,
  capsChecker,
  heightConverter,
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
  const stats = traits.stats.map((stat) => {
    if (stat.stat.name === 'special-attack') stat.stat.name = 'sp-atk';
    if (stat.stat.name === 'special-defense') stat.stat.name = 'sp-def';
    return stat;
  });
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
          <th>
            <Link to={`/Abilities`}>Abilities</Link>
          </th>
        </tr>
        <tr>
          {ability.map((ability) =>
            ability.is_hidden === false ? (
              <td className="pe-1" key={ability.ability.name}>
                <Link to={`/Abilities/${ability.ability.name}`}>
                  {capitalizer(ability.ability.name)}
                </Link>
              </td>
            ) : null
          )}
        </tr>
        <tr>
          <td>Hidden:</td>
          {ability.map((ability) =>
            ability.is_hidden === true ? (
              <td key={ability.ability.name}>
                <Link to={`/Abilities/${ability.ability.name}`}>
                  {capitalizer(ability.ability.name)}
                </Link>
              </td>
            ) : null
          )}
        </tr>
      </tbody>
      <tbody>
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
                <div>{capitalizer(stat.stat.name)}</div>
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

export const Moveset = ({ moves }) => {
  const [moveInfo, setMoveInfo] = useState();
  const moveList = moves
    .filter((move) => move.version_group_details[0].level_learned_at !== 0)
    .sort((a, b) => {
      return (
        a.version_group_details[0].level_learned_at -
        b.version_group_details[0].level_learned_at
      );
    });
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
                {moveList[index].version_group_details[0].level_learned_at === 1
                  ? '-'
                  : moveList[index].version_group_details[0].level_learned_at}
              </td>
              <td>
                <Link to={`/Moves/${move.name}`}>{capitalizer(move.name)}</Link>
              </td>
              <td>
                <img
                  src={require(`../../images/damage-classes/${move.damage_class.name}-icon.png`)}
                  alt=""
                  title={capitalizer(move.damage_class.name)}
                />
              </td>
              <td>
                <span
                  className="border rounded p-1"
                  style={{ backgroundColor: Type(move.type.name) }}
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
