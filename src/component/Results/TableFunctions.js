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

  //fix: dynamically choose learn method and region
  //this will filter the move list to only a specific region and learn method
  export const moveFilter = (array) => {
    const newArr = array
      .filter((move) => {
        if (
          move.version_group_details.some(
            (method) => method.move_learn_method.name === 'level-up' && method.version_group.name === 'sword-shield'
          )
        )
          return move;
        return null;
      })
      .sort((a, b) => {
        return (
          a.version_group_details[0].level_learned_at -
          b.version_group_details[0].level_learned_at
        );
      });
    return newArr;
  };