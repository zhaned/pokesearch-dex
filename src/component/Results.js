import './Results.css';

//fix: convert the number into a name so the search url is more consistent
//fix: dynamic background based on type
const Results = (props) => {
  const type = props.data.types[0].type.name;
  return (
    <div
      className="fade-in-above"
      style={{
        background:
          'url(' + require(`../images/types/${type}-bg.png`) + ') no-repeat ',
        backgroundPosition: 'center',
        backgroundSize: '100% 100%'}}
    >
      <h1
        className="display-3 text-center"
        style={{
          color: '#ffffff',
          textShadow: '2px 2px #851bed',
        }}
      >
        {props.data.name.charAt(0).toUpperCase() + props.data.name.slice(1)}
      </h1>
      <p>{props.data.types[0].type.name}</p>
      <hr
        style={{
          border: '1px solid #f0f0f0',
          borderRadius: '2px',
          opacity: '1',
        }}
      />
      <div className="d-flex justify-content-center">
        <img
          src={props.data.sprites.other['official-artwork'].front_default}
          alt={props.id}
          className="img-fluid"
        />
      </div>
    </div>
  );
};

export default Results;
