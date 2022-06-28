import dexLogo from '../../images/pokeapi-dex-icon.png';
import './Loading.css';
//fixed: add a looping gif here later
export default function Loading() {
  return (
    <div className="text-center">
      <h1
        className="display-2"
        style={{
          color: '#f8f9fa',
          textShadow:
            '0 0 6px #851bed, 0 0 6px #851bed, 0 0 6px #851bed, 0 0 6px #851bed',
        }}
      >
        Loading <span className="blinking"> . . .</span>
      </h1>
      <img src={dexLogo} alt="" className="spinning" />
    </div>
  );
}
