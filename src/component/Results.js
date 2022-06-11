const Results = (props) => {
  return (
    <div>
      <img src={props.data.sprites.other['official-artwork'].front_default} alt={props.id} className='img-fluid' />
      {props.data.name}
    </div>
  );
};

export default Results;
