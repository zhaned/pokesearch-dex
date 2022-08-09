import { useEffect } from "react";
import HrLineBreak from "../component/HrLineBreak";
import InfoLookUp from "../component/Info/InfoLookUp";

const Moves = () => {
  useEffect(() => {
    document.title = document.getElementById("title").innerHTML;
  }, []);
  return (
    <div className="container">
      <h1
        className="display-3 text-center"
        style={{
          color: "#f8f9fa",
          textShadow: "2px 2px #851bed",
        }}
        id="title"
      >
        Moves
      </h1>
      <HrLineBreak />
      <InfoLookUp infoType="move" />
    </div>
  );
};

export default Moves;
