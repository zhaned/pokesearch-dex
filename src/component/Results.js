import './Results.css';

//fix: convert the number into a name so the search url is more consistent
//fixed: dynamic background based on type
//fix: refactor this place holy
const Results = (props) => {
  const type = props.data.types[0].type.name;
  const heightM = props.data.height / 10; //will need more conversions to get feet'inches
  const weightLbs = Math.round(2.20462 * (props.data.weight / 10) * 10) / 10;
  const type2 = props.data.types.length;
  return (
    <div
      className="fade-in-above"
      style={{
        background:
          'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(' +
          require(`../images/types/${type}-bg.png`) +
          ') no-repeat ',
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        color: '#ffffff',
        textShadow: '2px 2px #851bed',
      }}
    >
      <h1 className="display-3 text-center pt-1">
        {props.data.name.charAt(0).toUpperCase() + props.data.name.slice(1)}
      </h1>
      <p className="text-light">
        {type} {type2 === 2 ? props.data.types[1].type.name : null}
      </p>
      <hr
        style={{
          border: '1px solid #f0f0f0',
          borderRadius: '2px',
          opacity: '1',
        }}
      />
      <div className="d-flex justify-content-between">
        <div>
          <table>
            <tbody>
              <tr>
                <th>Ablities</th>
                <td>1st ability</td>
                <td>2nd ability</td>
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
        </div>
        <table>
          <tbody>
            <tr>
              <th>{props.data.stats[0].stat.name}</th>
              <td>{props.data.stats[0].base_stat}</td>
            </tr>
            <tr>
              <th>{props.data.stats[1].stat.name}</th>
              <td>{props.data.stats[1].base_stat}</td>
            </tr>
            <tr>
              <th>{props.data.stats[2].stat.name}</th>
              <td>{props.data.stats[2].base_stat}</td>
            </tr>
            <tr>
              <th>{props.data.stats[3].stat.name}</th>
              <td>{props.data.stats[3].base_stat}</td>
            </tr>
            <tr>
              <th>{props.data.stats[4].stat.name}</th>
              <td>{props.data.stats[4].base_stat}</td>
            </tr>
            <tr>
              <th>{props.data.stats[5].stat.name}</th>
              <td>{props.data.stats[5].base_stat}</td>
            </tr>
          </tbody>
        </table>
        <div
          className="d-flex rounded-circle justify-content-center align-items-center"
          style={{
            objectFit: 'contain',
            border: '1px solid #851bed',
            background:
              'linear-gradient(rgba(240, 240, 240, 0.35),rgba(240, 240, 240, 0.35) )',
          }}
        >
          <img
            src={props.data.sprites.other['official-artwork'].front_default}
            alt={props.data.id}
            className="img-fluid ms-1"
            style={{
              maxHeight: '84%',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Results;
