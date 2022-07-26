import { useEffect } from 'react';
import InfoLookUp from '../component/Info/InfoLookUp';

const Abilities = () => {
  useEffect(() => {
    document.title = document.getElementById('title').innerHTML;
  },[])
  
  return (
    <div
      className="container"
    >
      <h1
        className="display-3 text-center"
        style={{
          color: '#f8f9fa',
          textShadow: '2px 2px #851bed',
        }}
        id='title'
      >
        Abilities
      </h1>
      <hr
        style={{
          border: '1px solid #f8f9fa',
          borderRadius: '2px',
          opacity: '1',
        }}
      />
      <InfoLookUp infoType="ability" />
    </div>
  );
};

export default Abilities;
