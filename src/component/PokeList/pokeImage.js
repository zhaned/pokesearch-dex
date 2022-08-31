const PokeImage = (url) => {
  let pokeId = url.url;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`;
  return (
    <img
      className="rounded-circle"
      src={imageUrl}
      alt={pokeId}
      style={{
        border: '1px solid #f8f9fa',
        background:
          'linear-gradient(rgba(245, 245, 245, 0.7),rgba(245, 245, 245, 0.4) )',
          objectFit: 'cover',
          maxHeight: '100%'
      }}
      
    />
  );
};

export default PokeImage;
