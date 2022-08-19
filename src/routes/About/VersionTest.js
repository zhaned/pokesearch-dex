import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selection, getVersions } from "../../component/Results/versionSlice";

export default function VersionTest({ payload }) {
  const { version_group } = useSelector((state) => state.version);
  const { versions } = useSelector((state) => state.version);
  const { generation } = useSelector((state) => state.version);
  const dispatch = useDispatch();
  const [actionPayload, setActionPayload] = useState(payload);
  useEffect(() => {
    dispatch(getVersions(actionPayload));
    console.log('action payload changed to: ', actionPayload)
    // dispatch(selection(getVersions));
    // console.log('actionPayload: ', actionPayload)
  }, [actionPayload, dispatch]);
  
  // console.log('generation', generation,'\n', 'versions test', versions,'\n', 'version_group', version_group)
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
          onClick={() => dispatch(selection(20))}
        >
          Change to gen 4
        </button>
      </div>
      {/* <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown button
        </button>
        <ul className="dropdown-menu">
          <li onClick={() => setActionPayload()}>
            <span className="dropdown-item">Update</span>
          </li>
          <li>GENERATION 3</li>
          <li>
            <a className="dropdown-item">Another action</a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div> */}
      <select className="btn btn-secondary" readOnly={"test"}>
        <optgroup label="Generation 1">
          <option onClick={() => setActionPayload(1)}>
            gen 1
          </option>
          <option onClick={() => setActionPayload(5)}>gen 5</option>
        </optgroup>
        <optgroup label="Generation 2">
          <option onClick={() => setActionPayload(2)} value={"test"}>gen 2</option>
          <option onClick={() => setActionPayload(8)} value={"test"}>gen 8</option>
        </optgroup>
      </select>
    </div>
  );
}
