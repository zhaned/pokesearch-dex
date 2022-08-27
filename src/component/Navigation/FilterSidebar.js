import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux/';
import {
  ascending,
  aToZ,
  descending,
  getPokedex,
  setSort,
  zToA,
} from '../../routes/SearchPage/SearchPageSlice';
import './FilterSidebar.css';

const FilterSidebar = ({ location }) => {
  const route = location;
  const { id } = useSelector((state) => state.pokedex);
  const { info } = useSelector((state) => state.pokedex);
  const { sort } = useSelector((state) => state.pokedex);
  const dispatch = useDispatch();

  //fixed: sort type doesn't filter when setting a diff dex
  useEffect(() => {
    switch (sort) {
      case 'ascending':
        dispatch(ascending(route));
        break;
      case 'descending':
        dispatch(descending(route));
        break;
      case 'atoz':
        dispatch(aToZ(route));
        break;
      case 'ztoa':
        dispatch(zToA(route));
        break;
      default:
        break;
    }
  }, [id, info, sort]);

  function handleChange(e) {
    e.preventDefault();
    dispatch(getPokedex(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    const value = e.target.value;
    dispatch(setSort(value));
  }
  return (
    <>
      <a
        className="btn btn-info"
        data-bs-toggle="offcanvas"
        href="#offcanvas"
        role="button"
        aria-controls="offcanvas"
        style={{
          position: 'fixed',
          top: '5rem',
          left: '1rem',
          zIndex: '1',
          color: 'rgb(250,250,250)',
        }}
      >
        Filters
      </a>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvas"
        aria-labelledby="offcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasLabel">
            Filters for Search
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div>Use these filters to make your search more precise!</div>
          {route === '/search' && (
            <div>
              <label htmlFor="pokedex">Pokedex:</label>
              <select
                className="m-1"
                id="pokedex"
                value={id}
                onChange={handleChange}
              >
                <option value="1">National</option>
                <option value="2">Kanto</option>
                <option value="7">Johto</option>
                <option value="15">Hoenn</option>
                <option value="6">Sinnoh</option>
                <option value="9">Unova</option>
                <optgroup label="Kalos">
                  <option value="12">Central Kalos</option>
                  <option value="13">Coastal Kalos</option>
                  <option value="14">Mt. Kalos</option>
                </optgroup>
                <option value="21">Alola</option>
                <option value="27">Galar</option>
              </select>
            </div>
          )}
          <div>
            <label htmlFor="sort">Sort:</label>
            <select
              className="m-1"
              id="sort"
              onChange={handleSort}
              value={sort}
            >
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
              <option value="atoz">A-Z</option>
              <option value="ztoa">Z-A</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
