export const Moveset = ({ moves }) => {
  const moveList = moves;
  //fix: get moves from a single generation
  //fix: order moves via level up
  return (
    <table>
      <tbody>
        <tr>
          <th>Level</th>
          <th>Name</th>
        </tr>
        {moveList.map((move) =>
          move.version_group_details[0].level_learned_at === 0 ? null : (
            <>
              <tr>
                <td>
                  {move.version_group_details[0].level_learned_at === 1
                    ? '-'
                    : move.version_group_details[0].level_learned_at}
                </td>
                <td>{move.move.name}</td>
              </tr>
            </>
          )
        )}
      </tbody>
    </table>
  );
};

export const Traits = ({traits}) => {
  const ability = traits.abilities[0].ability.name;
  const ability2 = traits.abilities.length;
  const heightM = traits.height / 10; //needs more conversions to get ft'in
  const weightLbs = Math.round(2.20462 * (traits.weight / 10) * 10) / 10;
  
  return (
    <table>
      <tbody>
        <tr>
          <th>Ablities</th>
          <td>{ability}</td>
          <td>
            {ability2 > 1 ? traits.abilities[1].ability.name : null}
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
  )
}
export const Stats = ({ stats }) => {
  console.log(stats);
  return (
    <table>
      <tbody>
        <tr>
          <th>{stats[0].stat.name}</th>
          <td>{stats[0].base_stat}</td>
        </tr>
        <tr>
          <th>{stats[1].stat.name}</th>
          <td>{stats[1].base_stat}</td>
        </tr>
        <tr>
          <th>{stats[2].stat.name}</th>
          <td>{stats[2].base_stat}</td>
        </tr>
        <tr>
          <th>{stats[3].stat.name}</th>
          <td>{stats[3].base_stat}</td>
        </tr>
        <tr>
          <th>{stats[4].stat.name}</th>
          <td>{stats[4].base_stat}</td>
        </tr>
        <tr>
          <th>{stats[5].stat.name}</th>
          <td>{stats[5].base_stat}</td>
        </tr>
      </tbody>
    </table>
  );
};
