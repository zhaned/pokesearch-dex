import { useSelector, useDispatch } from "react-redux";
import { selection } from "../../component/Results/versionSlice";

export default function VersionTest({ payload }) {
  const version = useSelector((state) => state.version.version_group);
  const dispatch = useDispatch();
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
          onClick={() => dispatch(selection(payload))}
        >
          Get Version
        </button>
      </div>
    </div>
  );
}
