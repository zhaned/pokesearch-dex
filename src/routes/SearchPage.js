import PokeLookUp from "../component/PokeList/PokeLookUp";

const SearchPage = () => {
  return (
    <div>
      <h1
        className="display-3"
        style={{
          color: "#f0f0f0",
          textShadow: "2px 2px #851bed",
        }}
      >
        <p className="text-center">Search Page</p>
      </h1>
      <PokeLookUp />
    </div>
  );
};

export default SearchPage;
