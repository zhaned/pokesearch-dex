import { Fragment, useEffect, useState } from 'react';

export const Moveset = ({ moves }) => {
  const [moveInfo, setMoveInfo] = useState([]);
  const moveList = moves
    .filter((move) => move.version_group_details[0].level_learned_at !== 0)
    .sort((a, b) => {
      return (
        a.version_group_details[0].level_learned_at -
        b.version_group_details[0].level_learned_at
      );
    });
  const funcThing = async () => {
    const url = moveList.map((move) => fetch(move.move.url).then(res => res.json()))
    const responses = await Promise.all(url);
    console.log(responses)
    setMoveInfo(responses)
  };
  useEffect(() => {
    funcThing();
  },[])
  //fix: get moves from a single generation
  //fix: order moves via level up
  return (
    <table className="table table-dark table-hover">
      <thead className="text-center">
        <tr>
          <th>
            <h4>Moves</h4>
          </th>
        </tr>
        <tr className='text-start'>
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
        {moveList.map((move) => (
          <Fragment key={move.move.name}>
            <tr>
              <td>
                {move.version_group_details[0].level_learned_at === 1
                  ? '-'
                  : move.version_group_details[0].level_learned_at}
              </td>
              <td>{move.move.name}</td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export const Traits = ({ traits }) => {
  const ability = traits.abilities[0].ability.name;
  const ability2 = traits.abilities.length;

  const stats = traits.stats;
  return (
    <table className='col'>
      <tbody>
        <tr>
          <th>Ablities</th>
          <td>{ability}</td>
          <td>{ability2 > 1 ? traits.abilities[1].ability.name : null}</td>
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
  const heightM = traits.height / 10; //needs more conversions to get ft'in
  const weightLbs = Math.round(2.20462 * (traits.weight / 10) * 10) / 10;
  return (
    <table className='col'>
      <tbody>
        <tr>
          <th>Description: </th>
          <td>{species.flavor_text_entries[0].flavor_text}</td>
        </tr>
        <tr>
          <th>Height</th>
          <td>{heightM} m</td>
        </tr>
        <tr>
          <th>Weight</th>
          <td>{weightLbs} lbs</td>
        </tr>
        <tr>
          <th>Capture Rate: </th>
          <td>{species.capture_rate}</td>
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
