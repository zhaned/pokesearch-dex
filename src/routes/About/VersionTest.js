import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selection } from "../../component/Results/versionSlice";

export default function VersionTest({ payload }) {
  const version = useSelector((state) => state.version.version_group);
  const dispatch = useDispatch();
  const [actionPayload, setActionPayload] = useState(payload)
  useEffect(() => {
    dispatch(selection(actionPayload))
    console.log('actionPayload: ', actionPayload)
  }, [actionPayload, dispatch])
  
  return (
    <div>
      <span
        style={{
          color: "#f8f9fa",
          textShadow: "2px 2px #851bed",
        }}
      >
        {version}
      </span>
      <div>
        <button
          className="btn btn-info border me-1"
          aria-label="select version"
          onClick={() => dispatch(selection(actionPayload))}
        >
          Get Version
        </button>
      </div>
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown button
        </button>
        <ul class="dropdown-menu">
          <li onClick={() => dispatch(selection(actionPayload))}>
            <span className="dropdown-item">Action</span>
          </li>
          <li disabled>GENERATION 3</li>
          <li>
            <a class="dropdown-item">Another action</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>
      <select>
        <optgroup label="CITY 1">
          <option onClick={() => dispatch(selection(actionPayload))}>
            City 1 branch A
          </option>
          <option onClick={() => setActionPayload(5)}>
            City 1 branch B
          </option>
          <option>City 1 branch C</option>
        </optgroup>
        <optgroup label="CITY 2">
          <option>City 2 branch A</option>
          <option>City 2 branch B</option>
        </optgroup>
      </select>
    </div>
  );
}
