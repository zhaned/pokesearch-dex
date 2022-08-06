export default function Pagination({ goPrevPage, goNextPage }) {
  return (
    <div>
      {goPrevPage ? (
        <button onClick={goPrevPage} className="btn btn-warning mx-1">
          Previous Page
        </button>
      ) : (
        <button
          onClick={goPrevPage}
          className="btn btn-warning mx-1"
          disabled='disabled'
        >
          Previous Page
        </button>
      )}
      {goNextPage ? (
        <button onClick={goNextPage} className="btn btn-warning mx-1">
          Next Page
        </button>
      ) : (
        <button
          onClick={goNextPage}
          className="btn btn-warning mx-1"
          disabled='disabled'
        >
          Next Page
        </button>
      )}
    </div>
  );
}
