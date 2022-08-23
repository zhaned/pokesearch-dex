const SearchBar = ({
  setOffset,
  setInputValue,
  setCurrentList,
  inputValue,
  info,
}) => {
  console.log(info)
  function handleChange(e) {
    e.preventDefault();
    setOffset(0);
    let value = e.target.value;
    value = value.replace(/[^A-Za-z0-9- ]/gi, '');
    setInputValue(value);
    setCurrentList(
      info.filter((obj) => {
        return obj.pokemon_species.name.includes(value);
      })
    );
  }

  function handleKeyDown(e) {
    let key = e.charCode || e.keyCode || 0;
    if (key === 13) {
      e.preventDefault();
    }
  }

  return (
    <form>
      <input
        className="form-control"
        value={inputValue}
        type={'text'}
        placeholder={'Search...'}
        pattern={'[A-Za-z0-9- ]+'}
        title={'Only letters, numbers, and hypens are accepted'}
        onInput={handleChange}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
};

export default SearchBar;
