import { useState, useEffect } from "react";
import Pagination from "../PokeList/Pagination";
import Loading from "../Loading/Loading";
import AbilityList from "./AbilityList";

const AbilityLookUp = () => {
  const [ability, setAbility] = useState();
  const [currentPageURL, setCurrentPageURL] = useState(
    "http://localhost:3001/ability"
  );
  const [prevPageURL, setPrevPageURL] = useState();
  const [nextPageURL, setNextPageURL] = useState();

  useEffect(() => {
    fetch(currentPageURL)
      .then((res) => res.json())
      .then((data) => {
        setNextPageURL(data.next);
        setPrevPageURL(data.previous);
        setAbility(data.results.map((p) => [p.name, p.url]));
      });
  }, [currentPageURL]);

  function goPrevPage() {
    setCurrentPageURL(prevPageURL);
  }
  function goNextPage() {
    setCurrentPageURL(nextPageURL);
  }

  return (
    <div>
      <Pagination
        goPrevPage={prevPageURL ? goPrevPage : null}
        goNextPage={nextPageURL ? goNextPage : null}
      />
      {ability ? <AbilityList ability={ability} /> : <Loading />}
    </div>
  );
}
 
export default AbilityLookUp;