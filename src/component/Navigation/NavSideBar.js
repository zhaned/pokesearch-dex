import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux/';
import {
  ascending,
  aToZ,
  descending,
  getPokedex,
  zToA,
} from '../../routes/SearchPage/SearchPageSlice';
import "./NavSideBar.css"

const NavSideBar = () => {
  const { id } = useSelector((state) => state.pokedex);
  const [currentDex, setCurrentDex] = useState(id);
  const dispatch = useDispatch();

  //fix: sort type doesn't filter when setting a diff dex
  //can't set in handlechange; select doesn't update
  useEffect(() => {
    setCurrentDex(id);
  }, [id]);

  function handleChange(e) {
    e.preventDefault();
    dispatch(getPokedex(e.target.value));
  }
  function handleSort(e) {
    e.preventDefault();
    switch (e.target.value) {
      case 'ascending':
        dispatch(ascending());
        break;
      case 'descending':
        dispatch(descending());
        break;
      case 'atoz':
        dispatch(aToZ());
        break;
      case 'ztoa':
        dispatch(zToA());
        break;
      default:
        break;
    }
  }
  return (
    <>
      <a
        className="btn btn-primary"
        data-bs-toggle="offcanvas"
        href="#offcanvas"
        role="button"
        aria-controls="offcanvas"
        style={{
          position: 'fixed',
          top: '5rem',
          left: '1rem',
          zIndex: '1',
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
          {/* <div className="dropdown mt-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              Dropdown button
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div> */}
          <div>
            <label htmlFor="pokedex">Pokedex:</label>
            <select
              className="m-1"
              id="pokedex"
              value={currentDex}
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
          <div>
            <label htmlFor="sort">Sort:</label>
            <select className="m-1" id="sort" onChange={handleSort}>
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

export default NavSideBar;
