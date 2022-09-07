import { Link } from 'react-router-dom';

//gets the icon for the homepage buttons
export default function ButtonIcon({ number, location, text, btn }) {
  const icon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${number}.png`;

  return (
    <div className="mb-3 sprite-ani">
      <Link to={`/${location}`} style={{ color: '#f8f9fa' }}>
        <div className="sprite-icon container p-0">
          <img
            src={icon}
            alt=""
            className="img-fluid d-flex"
            style={{
              width: '100%',
              height: 'auto',
              objectPosition: '0px -37px',
            }}
          />
        </div>
        <button
          className={`btn btn-lg ${btn}`}
          style={{ color: '#f8f9fa', textShadow: '2px 2px #851bed' }}
        >
          {text}
        </button>
      </Link>
    </div>
  );
}
