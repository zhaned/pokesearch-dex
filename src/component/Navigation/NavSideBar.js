import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux/';
import { getPokedex } from '../../routes/SearchPage/SearchPageSlice';

const NavSideBar = () => {
  const { id } = useSelector(state => state.pokedex);
  const [currentDex, setCurrentDex] = useState(id);
  const dispatch = useDispatch();

  //can't set in handlechange; select doesn't update
  useEffect(() => {
    setCurrentDex(id);
  }, [id]);

  function handleChange(e) {
    e.preventDefault();
    dispatch(getPokedex(e.target.value))
  }
  return (
    <>
      <a
        className="btn btn-primary"
        data-bs-toggle="offcanvas"
        href="#offcanvasExample"
        role="button"
        aria-controls="offcanvasExample"
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
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Filters for Search
          </h5>
          <button
            type="button"
            className="btn-close"
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
            <select className="m-1" id="sort">
              <option value="">Ascending</option>
              <option value="">Descending</option>
              <option value="">A-Z</option>
              <option value="">Z-A</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavSideBar;
