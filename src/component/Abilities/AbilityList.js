import { Link } from "react-router-dom";

const AbilityList = ({ability, test}) => {
  return ( 
    <div
    className="d-flex flex-wrap justify-content-center text-center fade-in-above shadow rounded"
    style={{ backgroundColor: 'rgb(200, 200, 200, .4)' }}
  >
    {ability.map((p) => (
      <Link
        key={p}
        to={{ pathname: `/${test}/${p[0]}` }}
        style={{ textDecoration: 'none' }}
      >
        <div
          className="card m-2 shadow align-items-center justify-content-center"
          style={{
            width: '10rem',
            height: '3rem',
            backgroundColor: '#8b43d4',
            backgroundImage: 'var(--bs-gradient)',
            border: 'solid 2px #f8f9fa',
            color: '#f7f7f7',
            flexDirection: "unset"
          }}
        >
          <div>
            {p[0].charAt(0).toUpperCase() + p[0].slice(1)}
          </div>
        </div>
      </Link>
    ))}
  </div>
   );
}
 
export default AbilityList;