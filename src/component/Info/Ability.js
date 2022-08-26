import { capitalizer } from "../Results/TableFunctions";
import { useEffect } from "react";
import { AbilityInfo, PokemonTable } from "../Results/Tables";
import HrLineBreak from "../HrLineBreak";

const Ability = ({ ability, version }) => {
  const pokemonList = ability.pokemon
    .filter((poke) => parseInt(poke.pokemon.url.slice(34).split("/")) < 899)
    .map((poke) => {
      return {
        pokemon: capitalizer(poke.pokemon.name),
        number: poke.pokemon.url.slice(34).split("/"),
        hidden: poke.is_hidden ? "yes" : "no",
      };
    });
  useEffect(() => {
    document.title = document.getElementById("title").innerText;
  }, []);
  return (
    <div style={{ color: "#f8f9fa", textShadow: "2px 2px #851bed" }}>
      <h1 className="display-3 text-center pt-1 pe-1" id="title">
        {capitalizer(
          ability.name.charAt(0).toUpperCase() + ability.name.slice(1)
        )}
      </h1>
      <HrLineBreak />
      <AbilityInfo ability={ability} version={version} />
      <HrLineBreak />
      <table className="table table-dark m-0">
        <thead className="text-center move-thead">
          <tr>
            <th>
              <h4>Pokémon With This Ability</h4>
            </th>
          </tr>
        </thead>
      </table>
      {pokemonList.length > 0 &&<PokemonTable list={pokemonList} />}
    </div>
  );
};

export default Ability;
