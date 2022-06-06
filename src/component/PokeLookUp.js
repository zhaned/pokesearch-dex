import React, { useState, useEffect } from "react";
import PokeList from "./PokeList";
import Pagination from "./Pagination";

function PokeLookUp() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageURL, setCurrentPageURL] = useState(
    "http://localhost:3001/pokemon"
  );
  const [prevPageURL, setPrevPageURL] = useState();
  const [nextPageURL, setNextPageURL] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(currentPageURL)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setNextPageURL(data.next);
        setPrevPageURL(data.previous);
        setPokemon(data.results.map((p) => [p.name, p.url]));
      });

  }, [currentPageURL]);

  function goPrevPage() {
    setCurrentPageURL(prevPageURL);
  }
  function goNextPage() {
    setCurrentPageURL(nextPageURL);
  }

  if (loading) return "loading .... temporary loading ... gif";

  return (
    <div>
      <PokeList pokemon={pokemon} />
      <Pagination
        goPrevPage={prevPageURL ? goPrevPage : null}
        goNextPage={nextPageURL ? goNextPage : null}
      />
    </div>
  );
}

export default PokeLookUp;
