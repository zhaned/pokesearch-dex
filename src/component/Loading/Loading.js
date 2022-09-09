import dexLogo from '../../images/pokesearch-dex-icon.png';
import './Loading.css';
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
