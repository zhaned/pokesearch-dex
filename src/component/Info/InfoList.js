import { Link } from 'react-router-dom';
import { capitalizer } from '../Results/TableFunctions';

const InfoList = ({ info, infoType }) => {
  return (
    <div
      className="d-flex flex-wrap justify-content-center text-center fade-in-above shadow rounded"
      style={{ backgroundColor: 'rgb(200, 200, 200, .4)' }}
    >
      {info.map((p) => (
        <Link
          key={p.name}
          to={{ pathname: `/${infoType}/${p.name}` }}
          style={{ textDecoration: 'none' }}
        >
          <div
            className="card m-2 shadow align-items-center justify-content-center"
            style={{
              width: '12rem',
              height: '3rem',
              backgroundColor: '#8b43d4',
              backgroundImage: 'var(--bs-gradient)',
              border: 'solid 2px #f8f9fa',
              color: '#f7f7f7',
              flexDirection: 'unset',
            }}
          >
            <div>{`#${p.index + 1} ` + capitalizer(p.name)}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default InfoList;
