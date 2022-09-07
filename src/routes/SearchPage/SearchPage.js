import { useEffect } from 'react';
import HrLineBreak from '../../component/HrLineBreak';
import PokeLookUp from '../../component/PokeList/PokeLookUp';

const SearchPage = () => {
  useEffect(() => {
    document.title = document.getElementById('title').innerHTML;
  }, []);
  return (
    <div>
      <h1
        className="display-3 text-center"
        style={{
          color: '#f8f9fa',
          textShadow: '2px 2px #851bed',
        }}
        id="title"
      >
        Search Page
      </h1>
      <HrLineBreak />
      <PokeLookUp />
    </div>
  );
};

export default SearchPage;
