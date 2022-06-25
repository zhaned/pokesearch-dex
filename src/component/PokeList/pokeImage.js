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
        border: '1px solid #f8f9fa',
        background:
          'linear-gradient(rgba(245, 245, 245, 0.7),rgba(245, 245, 245, 0.4) )',
      }}
    />
  );
};

export default PokeImage;
