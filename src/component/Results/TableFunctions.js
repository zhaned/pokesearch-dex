//fix: make it take in a region/group to choose which version to use
export const regionFilter = (arr) => {
  const oldArr = arr;
  let newArr;
  newArr = oldArr.filter((text) => (
    text.version.name === "sword"
  ))
  if(newArr.length === 0) return oldArr[oldArr.length - 1]
  return ( 
    newArr[0]
   );
}

export const langFilter = (arr) => {
  const oldArr = arr;
  let newArr;
  newArr = oldArr.filter((text) => (
    text.language.name === "en" 
  ))
    return newArr
}

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
