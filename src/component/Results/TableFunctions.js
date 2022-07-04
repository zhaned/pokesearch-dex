//fix: make it take in a region/group to choose which version to use
export const regionFilter = (arr) => {
  const oldArr = arr;
  let newArr;
  newArr = oldArr.filter((text) => text.version.name === "sword");
  if (newArr.length === 0) return oldArr[oldArr.length - 1];
  return newArr[0];
};

export const langFilter = (arr) => {
  const oldArr = arr;
  let newArr;
  newArr = oldArr.filter((text) => text.language.name === "en");
  return newArr;
};

export const heightConverter = (height) => {
  const sample = (height * 100) / 2.54 / 12;
  let feetIn;
  sample % 1 < 11.5 / 12
    ? (feetIn = `${Math.floor(sample)}'${
        Math.round((sample % 1) * 12) < 10
          ? "0" + Math.round((sample % 1) * 12) + '"'
          : Math.round((sample % 1) * 12)
      }`)
    : (feetIn = `${Math.floor(sample) + Math.round(sample % 1)}'00`);
  return feetIn;
};

export function capitalizer(text) {
  const oldText = text.replace(/-/g, " ").split(" ");
  let newText = [];
  oldText.map((word) =>
    newText.push(word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
  );
  return newText.join(" ");
}

export function capsChecker(text) {
  const oldText = text
    .replace(/\u000c/g, " ")
    .replace(/\n/g, " ")
    .split(" ");
  const capText = [];
  oldText.map((word) =>
    word.charAt(0) === word.charAt(0).toUpperCase()
      ? capText.push(word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
      : capText.push(word)
  );
  return capText.join(" ");
}

export function statRenamer(stat) {
  if (stat === "special-attack") stat = "sp-atk";
  if (stat === "special-defense") stat = "sp-def";
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
        console.log("error in switch statement");
    }
  }
  return typeFinal;
};
