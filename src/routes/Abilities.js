import AbilityLookUp from '../component/Abilities/AbilityLookUp'

const Abilities = () => {
  return (
    <div
      className="container d-flex flex-column align-items-center"
      style={{
        color: '#f8f9fa',
        textShadow: '2px 2px #851bed',
      }}
    >
      <h1 className="display-2">Abilities</h1>
      <AbilityLookUp />
    </div>
  );
};

export default Abilities;
