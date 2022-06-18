const PokeImage = (url) => {
  let pokeId = url.url;
  pokeId = pokeId.slice(34).split('/');
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId[0]}.png`;

  return (
    <img
      className="rounded-circle"
      src={imageUrl}
      alt={pokeId[0]}
      style={{
        border: '1px solid black',
        background:
          'linear-gradient(rgba(240, 240, 240, 0.3),rgba(240, 240, 240, 0.2) )',
      }}
    />
  );
};

export default PokeImage;
