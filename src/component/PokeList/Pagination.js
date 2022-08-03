export default function Pagination({ goPrevPage, goNextPage }) {
  return (
    <div className="d-flex justify-content-end">
      {goPrevPage && (
        <button onClick={goPrevPage} className="btn btn-warning mx-1">
          Previous Page
        </button>
      )}
      {goNextPage && (
        <button onClick={goNextPage} className="btn btn-warning ms-1">
          Next Page
        </button>
      )}
    </div>
  );
}
