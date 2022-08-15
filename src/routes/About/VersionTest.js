import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selection } from "../../component/Results/versionSlice";

export default function VersionTest({ payload }) {
  const { version_group } = useSelector((state) => state.version);
  const { versions } = useSelector((state) => state.version);
  const { generation } = useSelector((state) => state.version);
  const dispatch = useDispatch();
  const [actionPayload, setActionPayload] = useState(payload);
  useEffect(() => {
    dispatch(selection(actionPayload));
    // console.log('actionPayload: ', actionPayload)
  }, [actionPayload, dispatch]);

  return (
    <div>
      <span
        style={{
          color: "#f8f9fa",
          textShadow: "2px 2px #851bed",
        }}
      >
        {`generation: ${generation}. version_group: ${version_group}. versions: ${versions}`}
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
            <span className="dropdown-item">Update</span>
          </li>
          <li>GENERATION 3</li>
          <li>
            <a className="dropdown-item">Another action</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>
      <select className="btn btn-secondary" value={"test"}>
        <optgroup label="Generation 1">
          <option onClick={() => dispatch(selection(actionPayload))}>
            dispatch action
          </option>
          <option onClick={() => setActionPayload(5)}>set payload to 5</option>
          <option>City 1 branch C</option>
        </optgroup>
        <optgroup label="Generation 2">
          <option value={'test'}>default test</option>
          <option>City 2 branch B</option>
        </optgroup>
      </select>
    </div>
  );
}
