import AbilityLookUp from '../component/Abilities/AbilityLookUp';

const Moves = () => {
  return (
    <div
      className="container d-flex flex-column align-items-center"
      style={{
        color: '#f8f9fa',
        textShadow: '2px 2px #851bed',
      }}
    >
      <h1 className="display-2">Moves</h1>
      <AbilityLookUp test="move" />
    </div>
  );
};

export default Moves;
