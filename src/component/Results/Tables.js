export const Moveset = ({ moves }) => {
  const moveList = moves;
  console.log(moveList);
  return (
    <div>
      <table>
        <tbody>
          {moveList.map((move) => (
            move.version_group_details[0].level_learned_at === 0 ? null :
            <>
              <tr>{move.move.name}</tr>
              <tr>{move.version_group_details[0].level_learned_at}</tr>
            </>
            // <>
            //   <tr>{move.move.name}</tr>
            //   <tr>{move.version_group_details[0].level_learned_at}</tr>
            // </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// incase i need more
// export const Tables = () => {
//   return (
//     <div>Tables</div>
//   )
// }
