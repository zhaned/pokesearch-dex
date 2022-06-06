import { useState } from "react";

const PokeImage = async (urls) => {
  const [pokeImage, setPokeImage] = useState();

  console.log(urls, " look this way");
  const pokeInfo = await fetch(urls[0])
  setPokeImage(pokeInfo);
    console.log(pokeImage);
  return '{ pokeImage }';
};

export default PokeImage;
