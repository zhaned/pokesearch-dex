import pokeapiLogo from '../../images/pokeapi_logo.png';
import githubLogo from '../../images/GitHub-Icon.png';
import './footer.css';
const Footer = () => {
  return (
    <footer
      className="border-top d-flex justify-content-evenly"
      style={{
        color: '#f8f9fa',
        textShadow: '2px 2px #851bed',
      }}
    >
      <div className="d-flex align-items-center justify-content-center">
        <span className="me-1">Powered By</span>
        <a className="underline" href="https://pokeapi.co/">
          <img src={pokeapiLogo} alt="PokeAPI" style={{ height: '2rem' }} />
        </a>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <span className="me-1">Designed by</span>
        <a className="git-link" href="https://github.com/zhaned">
          <img src={githubLogo} alt="PokeAPI" style={{ height: '2rem' }} />{' '}
          zhaned
        </a>
      </div>
    </footer>
  );
};

export default Footer;
