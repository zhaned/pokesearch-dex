import { Link } from "react-router-dom";
export default function Error() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "70vh" }}
    >
      <h1
        className="display-4 m-3"
        style={{
          color: "#eded1b",
          textShadow: "2px 2px #851bed",
        }}
      >
        Sorry, But this page does not exist.
      </h1>
      <Link to={`/`}>
        <p className="btn btn-outline-info">Back to Homepage!</p>
      </Link>
    </div>
  );
}
