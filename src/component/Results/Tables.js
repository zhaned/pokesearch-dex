import { Fragment, useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import './Results.css';

export const Stats = ({ species, traits }) => {
  //fix: height near 12 inches aren't converted (.3m becomes 0"12)
  const height = (traits.height * 10) / 2.54 / 12; // in ft
  const weight = Math.round(2.20462 * traits.weight) / 10; // in lbs
  return (
    <table className="col border-end">
      <tbody>
        <tr>
          <th>Description: </th>
          <td>{species.flavor_text_entries[0].flavor_text}</td>
        </tr>
        <tr>
          <th>Height:</th>
          <td>
            {`${Math.floor(height)}'${
              Math.round((height % 1) * 12) < 10
                ? '0' + Math.round((height % 1) * 12) + '"'
                : Math.round((height % 1) * 12) + '"'
            }`}{' '}
            ({(height * 12 * 2.54) / 100} m)
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
          <td>{species.egg_groups.map((group) => group.name + ' ')}</td>
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
                {ability.ability.name.charAt(0).toUpperCase() +
                  ability.ability.name.slice(1)}
              </td>
            ) : null
          )}
        </tr>
        <tr>
          <td>Hidden:</td>
          {ability.map((ability) =>
            ability.is_hidden === true ? (
              <td key={ability.ability.name}>
                {ability.ability.name.charAt(0).toUpperCase() +
                  ability.ability.name.slice(1)}
              </td>
            ) : <td key={'HA'}>None</td>
          )}
        </tr>
      </tbody>
      <tbody>
        {stats.map((stat) => (
          <Fragment key={stat.stat.name}>
            <tr>
              <th
                className="border border-bottom-0 px-1"
                style={{ backgroundColor: 'rgba(0,0,0,.15)' }}
              >
                <div>
                  {stat.stat.name.charAt(0).toUpperCase() +
                    stat.stat.name.slice(1)}
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
                    minWidth: `${stat.base_stat < 10 ? '5%' : '7%'}`
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
              <td>{move.name}</td>
              <td>{move.damage_class.name}</td>
              <td>{move.type.name}</td>
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
