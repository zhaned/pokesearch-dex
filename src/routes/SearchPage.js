import PokeLookUp from "../component/PokeList/PokeLookUp";

const SearchPage = () => {
  return (
    <div>
      <h1
        className="display-2"
        style={{
          color: "#edb81b",
          textShadow: "2px 2px #851bed",
        }}
      >
        <p className="">Search Page</p>
      </h1>
      <PokeLookUp />
    </div>
  );
};

export default SearchPage;
