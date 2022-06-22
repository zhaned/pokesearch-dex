import { Fragment } from 'react';

export const Moveset = ({ moves }) => {
  const moveList = moves
    .filter((move) => move.version_group_details[0].level_learned_at !== 0)
    .sort((a, b) => {
      return (
        a.version_group_details[0].level_learned_at -
        b.version_group_details[0].level_learned_at
      );
    });
  // moves.map((move) => move.version_group_details[0].level_learned_at === 0 ? null : {
  //   name: move.move.name,
  //   level: move.version_group_details[0].level_learned_at
  // });
  console.log(moveList);
  //fix: get moves from a single generation
  //fix: order moves via level up
  return (
    <table>
      <thead>
        <tr>
          <th>Moves</th>
        </tr>
        <tr>
          <th>Level</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {moveList.map((move) =>
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
        )}
      </tbody>
    </table>
  );
};

export const Traits = ({ traits }) => {
  const ability = traits.abilities[0].ability.name;
  const ability2 = traits.abilities.length;

  const stats = traits.stats;
  return (
    <table>
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
    <table>
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
