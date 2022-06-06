const PokeImage = (url) => {
  let pokeId = url.url;
  pokeId = pokeId.slice(34).split('/');
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId[0]}.png`;

  return (
    <img src={imageUrl} alt={pokeId[0]} />
  )
};

export default PokeImage;
