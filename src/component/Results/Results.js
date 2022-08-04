import './Results.css';
import {
  Moveset,
  Traits,
  Stats,
  Evolutions,
  Header,
  TypeMatchup,
} from './Tables';
import { useState, useEffect } from 'react';

//fix: convert the number into a name so the search url is more consistent
//fixed: dynamic background based on type
//fix: refactor this place holy
const Results = ({ pokemon, species, evolution, types }) => {
  //this will be pulled from the url of the version group
  const [version, setVersion] = useState('20');
  const type = pokemon.types[0].type.name;
  const type2 = pokemon.types.length > 1 ? pokemon.types[1].type.name : null;
  const id = parseInt(pokemon.species.url.slice(42).split('/'));
  useEffect(() => {
    document.title = document.getElementById('title').innerText;
  }, []);
  return (
    <div
      className="fade-in-above text-light"
      style={{
        textShadow: `2px 2px #851bed`,
      }}
    >
      <Header id={id} pokemon={pokemon} type={type} type2={type2} />
      <hr
        style={{
          border: '1px solid #f8f9fa',
          borderRadius: '2px',
          opacity: '1',
        }}
      />
      <div>
        <div
          className="d-flex justify-content-between border rounded"
          style={{
            background:
              'linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45) ), url(' +
              require(`../../images/types/${type}-bg.png`) +
              ') no-repeat ',
            backgroundPosition: 'center',
            backgroundSize: '100% 100%',
          }}
        >
          <Traits species={species} data={pokemon} />
          <Stats data={pokemon} />
          <div
            className="d-flex rounded-circle justify-content-center align-items-center col"
            style={{
              objectFit: 'contain',
              border: '1px solid #851bed',
              background:
                'linear-gradient(rgba(240, 240, 240, 0.35),rgba(15,15,15, 0.35) )',
            }}
          >
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={'(not currently available)'}
              className="img-fluid ms-1"
              style={{
                maxHeight: '84%',
              }}
            />
          </div>
        </div>
        <hr
          style={{
            border: '1px solid #f8f9fa',
            borderRadius: '2px',
            opacity: '1',
          }}
        />
        <div className="d-flex justify-content-between">
          <Evolutions evolution={evolution} />
          <TypeMatchup types={types} />
        </div>
        <hr
          style={{
            border: '1px solid #f8f9fa',
            borderRadius: '2px',
            opacity: '1',
          }}
        />
        <div>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item me-1" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
                style={{
                  color: '#f8f9fa',
                  textShadow: '2px 2px #851bed',
                }}
              >
                Moves
              </button>
            </li>
            <li className="nav-item me-1" role="presentation">
              <button
                className="nav-link "
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
                style={{
                  color: '#f8f9fa',
                  textShadow: '2px 2px #851bed',
                }}
              >
                TM/TR
              </button>
            </li>
            <li className="nav-item me-1" role="presentation">
              <button
                className="nav-link "
                id="contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#contact"
                type="button"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
                style={{
                  color: '#f8f9fa',
                  textShadow: '2px 2px #851bed',
                }}
              >
                Egg
              </button>
            </li>
            <li className="nav-item me-1" role="presentation">
              <button
                className="nav-link "
                id="tutor-tab"
                data-bs-toggle="tab"
                data-bs-target="#tutor"
                type="button"
                role="tab"
                aria-controls="tutor"
                aria-selected="false"
                style={{
                  color: '#f8f9fa',
                  textShadow: '2px 2px #851bed',
                }}
              >
                Tutor
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <Moveset
                moves={pokemon.moves}
                version={version}
                method="level-up"
              />
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <Moveset
                moves={pokemon.moves}
                version={version}
                method="machine"
              />
            </div>
            <div
              className="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              <Moveset moves={pokemon.moves} version={version} method="egg" />
            </div>
            <div
              className="tab-pane fade"
              id="tutor"
              role="tabpanel"
              aria-labelledby="tutor-tab"
            >
              <Moveset moves={pokemon.moves} version={version} method="tutor" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
