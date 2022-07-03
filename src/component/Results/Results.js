import "./Results.css";
import { Moveset, Stats, Traits, Evolutions } from "./Tables";
import Type from "../Type";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//fix: convert the number into a name so the search url is more consistent
//fixed: dynamic background based on type
//fix: refactor this place holy
const Results = ({ pokemon, species, evolution, types }) => {
  //this will be pulled from the url of the version group
  const [version, setVersion] = useState("20");
  const navigate = useNavigate();
  const type = pokemon.types[0].type.name;
  const type2 = pokemon.types.length;
  const id = parseInt(pokemon.species.url.slice(42).split("/"));
  //this feels kinda hacky but it works for now.
  //takes you to the new location after clicking one of the links
  //to the previous or next pokemon and refreshes the page.
  //refresh is somewhat necessary because nothing will render since
  //its the same route
  function updateLocation(url) {
    navigate(url, { replace: true });
    window.location.reload();
  }
  return (
    <div
      className="fade-in-above text-light"
      style={{
        textShadow: "2px 2px #851bed",
      }}
    >
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          {/* fix: add the previous pokemon as a link here with a sprite */}
          {id === 1 ? null : (
            <Link
              to={`/search/${id - 1}`}
              onClick={() => updateLocation(`/search/${id - 1}`)}
            >
              <h3 className="next-sprite">
                <span style={{ verticalAlign: "bottom" }}>&lt;</span>
                <img
                  className="img-fluid"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${
                    id - 1
                  }.png`}
                  alt=""
                />
              </h3>
            </Link>
          )}
        </div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ margin: "0px" }}
        >
          <h1 className="display-3 text-center pt-1 pe-1">
            #{id} {/*fixed: change this to get the id from species.url later*/}
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h1>
          <p className="d-flex align-items-end px-1 mt-3">
            <span
              className="border rounded px-1 me-1"
              style={{ backgroundColor: Type(type) }}
            >
              {type}
            </span>{" "}
            {type2 === 2 ? (
              <span
                className="border rounded px-1"
                style={{ backgroundColor: Type(pokemon.types[1].type.name) }}
              >
                {pokemon.types[1].type.name}
              </span>
            ) : null}
          </p>
        </div>
        <div className="d-flex align-items-center">
          {/* fix: add the next pokemon as a link here with a sprite */}
          {id === 898 ? null : (
            <Link
              to={`/search/${id + 1}`}
              onClick={() => updateLocation(`/search/${id + 1}`)}
            >
              <h3 className="next-sprite">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${
                    id + 1
                  }.png`}
                  alt=""
                />
                <span style={{ verticalAlign: "bottom" }}>&gt;</span>
              </h3>
            </Link>
          )}
        </div>
      </div>
      <hr
        style={{
          border: "1px solid #f8f9fa",
          borderRadius: "2px",
          opacity: "1",
        }}
      />
      <div>
        <div
          className="d-flex justify-content-between border rounded"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45) ), url(" +
              require(`../../images/types/${type}-bg.png`) +
              ") no-repeat ",
            backgroundPosition: "center",
            backgroundSize: "100% 100%",
          }}
        >
          <Stats species={species} traits={pokemon} />
          <Traits traits={pokemon} />
          <div
            className="d-flex rounded-circle justify-content-center align-items-center col"
            style={{
              objectFit: "contain",
              border: "1px solid #851bed",
              background:
                "linear-gradient(rgba(240, 240, 240, 0.35),rgba(15,15,15, 0.35) )",
            }}
          >
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.id}
              className="img-fluid ms-1"
              style={{
                maxHeight: "84%",
              }}
            />
          </div>
        </div>
        <hr
          style={{
            border: "1px solid #f8f9fa",
            borderRadius: "2px",
            opacity: "1",
          }}
        />
        <Evolutions evolution={evolution} />
        <hr
          style={{
            border: "1px solid #f8f9fa",
            borderRadius: "2px",
            opacity: "1",
          }}
        />
        <div>
          <Moveset moves={pokemon.moves} version={version} />
        </div>
      </div>
    </div>
  );
};

export default Results;
