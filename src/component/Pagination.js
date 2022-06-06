export default function Pagination({ goPrevPage, goNextPage }) {
  return (
    <div>
      {goPrevPage && (
        <button onClick={goPrevPage} className="btn btn-warning">
          Previous page
        </button>
      )}
      {goNextPage && (
        <button onClick={goNextPage} className="btn btn-warning">
          Next page
        </button>
      )}
    </div>
  );
}
