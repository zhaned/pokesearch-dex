import InfoLookUp from '../component/Info/InfoLookUp';

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
      <InfoLookUp infoType="ability" />
    </div>
  );
};

export default Abilities;
