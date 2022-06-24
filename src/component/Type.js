const Type = (type) => {
  const typeColor = {
    bug: '#91af08',
    dark: '#3c3c3c',
    dragon: '#5000e0',
    electric: '#e0df00',
    fighting: '#e63600',
    fire: '#d55400',
    fairy: '#e17dee',
    flying: '#9279c8',
    ghost: '#59457f',
    grass: '#29af28',
    ground: '#8a662d',
    ice:  '#6fdcf1',
    normal: '#9f9f9f',
    poison: '#7b00c6',
    psychic: '#cf3d6e',
    rock: '#85715c',
    steel: '#a8a8a8',
    water: '#1773d8',
  }
  const typing = type;
  const color = typeColor[typing] || 'black';
  return color;

}
 
export default Type;