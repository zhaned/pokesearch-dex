import HrLineBreak from "../../component/HrLineBreak";
import './NavSideBar.css'

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
    </div>
  );
}
