//fix: make it take in a region/group to choose which version to use
export const regionFilter = (arr) => {
  const oldArr = arr;
  let newArr;
  newArr = oldArr.filter((text) => text.version.name === 'sword');
  if (newArr.length === 0) return oldArr[oldArr.length - 1];
  return newArr[0];
};

export const langFilter = (arr) => {
  const oldArr = arr;
  let newArr;
  newArr = oldArr.filter((text) => text.language.name === 'en');
  return newArr;
};

export const heightConverter = (height) => {
  const sample = (height * 100) / 2.54 / 12;
  let feetIn;
  sample % 1 < 11.5 / 12
    ? (feetIn = `${Math.floor(sample)}'${
        Math.round((sample % 1) * 12) < 10
          ? '0' + Math.round((sample % 1) * 12) + '"'
          : Math.round((sample % 1) * 12)
      }`)
    : (feetIn = `${Math.floor(sample) + Math.round(sample % 1)}'00`);
  return feetIn;
};

export function capitalizer(text) {
  const oldText = text.replace(/-/g, ' ').split(' ');
  let newText = [];
  oldText.map((word) =>
    newText.push(word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
  );
  return newText.join(' ');
}

export function capsChecker(text) {
  const oldText = text
    .replace(/\u000c/g, ' ')
    .replace(/\n/g, ' ')
    .split(' ');
  const capText = [];
  oldText.map((word) =>
    word.charAt(0) === word.charAt(0).toUpperCase()
      ? capText.push(word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
      : capText.push(word)
  );
  return capText.join(' ');
}

export function statRenamer(stat) {
  if (stat === 'special-attack') stat = 'sp-atk';
  if (stat === 'special-defense') stat = 'sp-def';
  return capitalizer(stat);
}

//this will filter the move list to only a specific version and learn method
export const moveFilter = (array, version, learn_method) => {
  const newArr = array
    .filter((move) => {
      if (
        move.version_group_details.some(
          (method) =>
            method.move_learn_method.name === learn_method &&
            method.version_group.url ===
              `https://pokeapi.co/api/v2/version-group/${version}/`
        )
      )
        return move;
      return null;
    })
    .sort((a, b) => {
      return (
        // a.version_group_details[0].level_learned_at -
        // b.version_group_details[0].level_learned_at
        levelGetter(a, version) - levelGetter(b, version)
      );
    });
  return newArr;
};

export const levelGetter = (moves, version) => {
  for (let index of moves.version_group_details) {
    if (
      index.version_group.url ===
      `https://pokeapi.co/api/v2/version-group/${version}/`
    )
      return index.level_learned_at;
  }
};

//this feels kinda hacky but it works for now.
//takes you to the new location after clicking one of the links
//to the previous or next pokemon and refreshes the page.
//refresh is somewhat necessary because nothing will render since
//its the same route
export function updateLocation(navigate, url) {
  navigate(url, { replace: true });
  window.location.reload();
}

export const TypeMultiplyer = (types, TypeNames) => {
  let allTypes = TypeNames();
  let type1 = [];
  let type2 = [];
  let typeFinal = {
    quadruple: [],
    double: [],
    neutral: [],
    half: [],
    quarter: [],
    no: [],
  };
  types[0].damage_relations.double_damage_from.forEach((type) => {
    type1.push({
      name: type.name,
      value: 2,
    });
    const index = allTypes.indexOf(type.name);
    if (index > -1) allTypes.splice(index, 1);
  });
  types[0].damage_relations.half_damage_from.forEach((type) => {
    type1.push({
      name: type.name,
      value: 0.5,
    });
    const index = allTypes.indexOf(type.name);
    if (index > -1) allTypes.splice(index, 1);
  });
  types[0].damage_relations.no_damage_from.forEach((type) => {
    type1.push({
      name: type.name,
      value: 0,
    });
    const index = allTypes.indexOf(type.name);
    if (index > -1) allTypes.splice(index, 1);
  });
  allTypes.forEach((type) => {
    type1.push({
      name: type,
      value: 1,
    });
  });
  allTypes = TypeNames();
  if (types.length > 1) {
    types[1].damage_relations.double_damage_from.forEach((type) => {
      type2.push({
        name: type.name,
        value: 2,
      });
      const index = allTypes.indexOf(type.name);
      if (index > -1) allTypes.splice(index, 1);
    });
    types[1].damage_relations.half_damage_from.forEach((type) => {
      type2.push({
        name: type.name,
        value: 0.5,
      });
      const index = allTypes.indexOf(type.name);
      if (index > -1) allTypes.splice(index, 1);
    });
    types[1].damage_relations.no_damage_from.forEach((type) => {
      type2.push({
        name: type.name,
        value: 0,
      });
      const index = allTypes.indexOf(type.name);
      if (index > -1) allTypes.splice(index, 1);
    });
  }
  allTypes.forEach((type) => {
    type2.push({
      name: type,
      value: 1,
    });
  });
  // console.log("alltypes", allTypes, "\n", "type1", type1, "\n", "type2", type2);
  for (const type of type1) {
    let somet = type2.find((obj) => obj.name === type.name) || 1;
    const weakness = type.value * somet.value;
    switch (weakness) {
      case 4:
        typeFinal.quadruple.push(type.name);
        break;
      case 2:
        typeFinal.double.push(type.name);
        break;
      case 1:
        typeFinal.neutral.push(type.name);
        break;
      case 0.5:
        typeFinal.half.push(type.name);
        break;
      case 0.25:
        typeFinal.quarter.push(type.name);
        break;
      case 0:
        typeFinal.no.push(type.name);
        break;
      default:
        console.log('error in switch statement');
    }
  }
  return typeFinal;
};

export const EvoTrigger = ({ evo }) => {
  const trigger = evo.evolution_details[evo.evolution_details.length - 1];
  let newTrigger;
  let title;
  if (trigger) {
    switch (trigger.trigger.name) {
      case 'level-up':
        title = 'level up to evolve';
        newTrigger = 'level';
        break;
      case 'trade':
        title = 'trade to evolve';
        newTrigger = 'trade';
        break;
      case 'use-item':
        title = 'use an item to evolve';
        newTrigger = 'item';
        break;
      case 'shed':
        title = 'have an empty slot in party';
        newTrigger = 'shed';
        break;
      case 'spin':
        title = 'spin while holding a sweet item to evolve';
        newTrigger = 'spin';
        break;
      case 'tower-of-darkness':
      case 'tower-of-waters':
        title = 'tower of darkness or tower of water';
        newTrigger = 'tower';
        break;
      case 'three-critical-hits':
        title = 'land 3 critical hits in one battle';
        newTrigger = 'crit';
        break;
      case 'take-damage':
        title = 'take 49 damage in one battle';
        newTrigger = 'damage';
        break;
      default:
        break;
    }
  } else {
    return null;
  }

  return (
    <div className="d-flex justify-content-center">
      <img
        src={require(`../../images/evolution/${newTrigger}-icon.png`)}
        alt={newTrigger}
        title={title}
        style={{ maxWidth: '24px' }}
      />
    </div>
  );
};

export const EvoDetails = ({ evo }) => {
  const obj = evo.evolution_details[evo.evolution_details.length - 1];
  let condition = [];
  let item = [];
  for (const key in obj) {
    if (
      obj[key] !== null &&
      obj[key] !== false &&
      obj[key] !== '' &&
      key !== 'trigger'
    ) {
      switch (key) {
        case 'gender':
          if (obj[key] === 1) {
            condition.push('♀');
          } else {
            condition.push('♂');
          }
          break;
        case 'held_item':
          item.push({
            name: obj[key].name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${obj[key].name}.png`,
          });
          break;
        case 'item':
          item.push({
            name: obj[key].name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${obj[key].name}.png`,
          });
          break;
        case 'known_move':
          item.push({
            name: obj[key].name,
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png',
          });
          break;
        case 'known_move_type':
          item.push({
            name: `${obj[key].name}-type move`,
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-fairy.png',
          });
          break;
        case 'location':
          item.push({
            name: obj[key].name,
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/old-sea-map.png',
          });
          break;
        case 'min_affection':
          break;
        case 'min_beauty':
          item.push({
            name: `beauty value of ${obj[key]}`,
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/blue-scarf.png',
          });
          break;
        case 'min_happiness':
          item.push({
            name: `happiness value of ${obj[key]}`,
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/soothe-bell.png',
          });
          break;
        case 'min_level':
          condition.push(obj[key]);
          break;
        case 'needs_overworld_rain':
          item.push({
            name: `rain`,
            image:
              'https://archives.bulbagarden.net/media/upload/thumb/6/6d/Rain_icon_LA.png/30px-Rain_icon_LA.png',
          });
          break;
        case 'party_species':
          item.push({
            name: `${obj[key].name} in the party`,
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/223.png',
          });
          break;
        case 'party_type':
          item.push({
            name: `${obj[key].name}-type in the party`,
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/black-glasses.png',
          });
          break;
        case 'relative_physical_stats':
          if (obj[key] > 0) {
            condition.push('Atk↑');
          } else if (obj[key] < 0) {
            condition.push('Def↑');
          } else {
            condition.push('Atk = Def');
          }
          break;
        case 'time_of_day':
          condition.push(obj[key]);
          break;
        case 'trade_species':
          item.push({
            name: `trade with a ${obj[key].name}`,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${parseInt(
              obj[key].url.slice(42).split('/')
            )}.png`,
          });
          break;
        case 'turn_upside_down':
          item.push({
            name: `hold console upside down`,
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/gb-sounds.png',
          });
          break;
        default:
          break;
      }
    }
  }
  return (
    <div className="d-flex justify-content-center">
      {condition.map((item) => {
        return (
          <div className="me-1" title={item} key={item}>
            {item}
          </div>
        );
      })}
      {item.map((item) => {
        return (
          <img
            src={item.image}
            alt={item.name}
            title={item.name}
            key={item.name}
          />
        );
      })}
    </div>
  );
};

export const AbilityFilter = (array, version, language) => {
  const newArr = language(array.filter((item) => {
    if (
      item.version_group.url ===
      `https://pokeapi.co/api/v2/version-group/${version}/`
    ) {
      return item;
    }
    return null;
  }));
  return newArr
};

export function effectEntryAdder(entries, effect) {
  let newEffect, newShortEffect;
  newEffect = entries.length > 0 ? entries[0].effect
    .split(' ')
    .map((word) => (word === '$effect_chance%' ? effect + '%' : word)) : ['(Currently no description.)'];
  newShortEffect = entries.length > 0 ? entries[0].short_effect
    .split(' ')
    .map((word) => (word === '$effect_chance%' ? effect + '%' : word)): ['(Currently no description.)'];
  return {
    effect: newEffect.join(' '),
    short_effect: newShortEffect.join(' '),
  };
}