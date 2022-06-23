import { Fragment, useEffect, useState } from 'react';
import Loading from '../Loading/Loading';

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
      <thead className="text-center">
        <tr>
          <th>
            <h4>Moves</h4>
          </th>
        </tr>
        <tr className="text-start">
          <th>Level</th>
          <th>Name</th>
          <th>Category</th>
          <th>Type</th>
          <th>Atk</th>
          <th>Acc</th>
          <th>PP</th>
        </tr>
      </thead>
      <tbody>
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

export const Traits = ({ traits }) => {
  const ability = traits.abilities;
  // const ability2 = traits.abilities.length;

  const stats = traits.stats;
  return (
    <table className="col">
      <tbody>
        <tr>
          <th>Ablities</th>
          {/* <td>{ability}</td>
          <td>{ability2 > 1 ? traits.abilities[1].ability.name : null}</td> */}
          {ability.map((ability) =>
            ability.is_hidden === false ? (
              <td>{ability.ability.name}</td>
            ) : (
              <td>
                <tr>hidden:</tr>
                <tr>{ability.ability.name}</tr>
              </td>
            )
          )}
        </tr>
      </tbody>
      <tbody>
        {stats.map((stat) => (
          <Fragment key={stat.stat.name}>
            <tr>
              <th>{stat.stat.name}</th>
              <td>{stat.base_stat}</td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export const Stats = ({ species, traits }) => {
  const height = (traits.height * 10) / 2.54 / 12; // in ft
  const weight = Math.round(2.20462 * traits.weight) / 10; // in lbs
  return (
    <table className="col">
      <tbody>
        <tr>
          <th>Description: </th>
          <td>{species.flavor_text_entries[0].flavor_text}</td>
        </tr>
        <tr>
          <th>Height</th>
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
          <th>Weight</th>
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
          {species.egg_groups.map((group) => (
            <td>{group.name}</td>
          ))}
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
