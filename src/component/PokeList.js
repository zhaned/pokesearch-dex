export default function PokeList({ pokemon }) {
  return (
    <div>
      {pokemon.map((p) => (
        <div
          key={p}
          className="card "
          style={{ width: "8rem", height: "8rem" }}
        >
          {p}
        </div>
      ))}
    </div>
  );
}
