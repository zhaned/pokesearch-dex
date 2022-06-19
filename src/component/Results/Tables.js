export const Moveset = ({ moves }) => {
  const moveList = moves;
  //fix: get moves from a single generation
  //fix: order moves via level up
  console.log(moveList);
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
                <td>{move.version_group_details[0].level_learned_at === 1 ? '-' : move.version_group_details[0].level_learned_at}</td>
                <td>{move.move.name}</td>
              </tr>
            </>
          )
        )}
      </tbody>
    </table>
  );
};

// incase i need more
// export const Tables = () => {
//   return (
//     <div>Tables</div>
//   )
// }
