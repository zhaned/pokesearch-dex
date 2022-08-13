import HrLineBreak from "../../component/HrLineBreak";
import { Counter } from "../../redux/Counter";
import VersionTest from "./VersionTest";

export default function About() {
  return (
    <div>
      <h1
        className="display-3 text-center"
        style={{
          color: "#f8f9fa",
          textShadow: "2px 2px #851bed",
        }}
      >
        About (using this page to test stuff atm)
      </h1>
      <HrLineBreak />
      <Counter />
      <VersionTest payload={2}/>
    </div>
  );
}
