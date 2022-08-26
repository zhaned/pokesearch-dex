const typeColor = {
  bug: {
    name: 'bug',
    color: '#91af08',
  },
  dark: {
    name: 'dark',
    color: '#3c3c3c',
  },
  dragon: {
    name: 'dragon',
    color: '#5000e0',
  },
  electric: {
    name: 'electric',
    color: '#d1d000',
  },
  fighting: {
    name: 'fighting',
    color: '#e63600',
  },
  fire: {
    name: 'fire',
    color: '#d55400',
  },
  fairy: {
    name: 'fairy',
    color: '#e17dee',
  },
  flying: {
    name: 'flying',
    color: '#9279c8',
  },
  ghost: {
    name: 'ghost',
    color: '#59457f',
  },
  grass: {
    name: 'grass',
    color: '#29af28',
  },
  ground: {
    name: 'ground',
    color: '#8a662d',
  },
  ice: {
    name: 'ice',
    color: '#6bd3e7',
  },
  normal: {
    name: 'normal',
    color: '#808080',
  },
  poison: {
    name: 'poison',
    color: '#7b00c6',
  },
  psychic: {
    name: 'psychic',
    color: '#cf3d6e',
  },
  rock: {
    name: 'rock',
    color: '#85715c',
  },
  steel: {
    name: 'steel',
    color: '#a1a1a1',
  },
  water: {
    name: 'water',
    color: '#1773d8',
  }
};

export const TypeColor = (type) => {
  const typing = type;
  const color = typeColor[typing].color || 'black';
  return color;
};

export const TypeNames = () => {
  const names = Object.keys(typeColor);
  return names;
};
