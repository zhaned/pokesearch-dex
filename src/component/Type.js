const typeColor = {
  bug: '#91af08',
  dark: '#3c3c3c',
  dragon: '#5000e0',
  electric: '#d1d000',
  fighting: '#e63600',
  fire: '#d55400',
  fairy: '#e17dee',
  flying: '#9279c8',
  ghost: '#59457f',
  grass: '#29af28',
  ground: '#8a662d',
  ice:  '#6bd3e7',
  normal: '#808080',
  poison: '#7b00c6',
  psychic: '#cf3d6e',
  rock: '#85715c',
  steel: '#a1a1a1',
  water: '#1773d8',
}

const Type = (type) => {
  const typing = type;
  const color = typeColor[typing] || 'black';
  return color;

}
 
export default Type;