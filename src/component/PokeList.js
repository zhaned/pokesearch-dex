export default function PokeList({ pokemon }) {
  const urlList = pokemon.map(url => url[1]);
  console.log(urlList, 'hello world')
  return (
    <div>
      {pokemon.map((p) => (
        <div
          key={p}
          className="card "
          style={{ width: "8rem", height: "8rem" }}
        >
          {p[0]}
        </div>
      ))}
      {/* <PokeList urls={[urlList]} /> */}
    </div>
  );
}
