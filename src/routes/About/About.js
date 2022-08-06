import { Counter } from "../../redux/Counter";
import Component from "./Component";

export default function About() {
  return (
    <>
      <h1
        className="display-3 text-center"
        style={{
          color: '#f8f9fa',
          textShadow: '2px 2px #851bed',
        }}
      >
        About
      </h1>
      <hr
        style={{
          border: '1px solid #f8f9fa',
          borderRadius: '2px',
          opacity: '1',
        }}
      />
      <Counter />
      <Component />
    </>
  );
}
