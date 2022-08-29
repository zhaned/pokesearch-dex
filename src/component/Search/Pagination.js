import { useState, useEffect } from 'react';

export default function Pagination({
  currentInfo,
  offset,
  setOffset,
  offsetAmount,
}) {
  const [prevPageURL, setPrevPageURL] = useState(null);
  const [nextPageURL, setNextPageURL] = useState(1);
  const info = currentInfo || '1';
  useEffect(() => {
    if (info.length - offset > offsetAmount) {
      setNextPageURL(1);
    } else {
      setNextPageURL(null);
    }

    if (offset > 0) {
      setPrevPageURL(1);
    } else {
      setPrevPageURL(null);
    }
  }, [offset, info, offsetAmount]);

  function goPrevPage(offsetAmount) {
    setOffset(offset - offsetAmount);
  }
  function goNextPage(offsetAmount) {
    setOffset(offset + offsetAmount);
  }

  return (
    <div>
      {prevPageURL ? (
        <button
          onClick={() => goPrevPage(offsetAmount)}
          className="btn btn-warning mx-1"
        >
          Previous Page
        </button>
      ) : (
        <button className="btn btn-warning mx-1" disabled="disabled">
          Previous Page
        </button>
      )}
      {nextPageURL ? (
        <button
          onClick={() => goNextPage(offsetAmount)}
          className="btn btn-warning mx-1"
        >
          Next Page
        </button>
      ) : (
        <button className="btn btn-warning mx-1" disabled="disabled">
          Next Page
        </button>
      )}
    </div>
  );
}
