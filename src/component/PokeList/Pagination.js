export default function Pagination({ goPrevPage, goNextPage }) {
  return (
    <div className="d-flex justify-content-end mb-1">
      {goPrevPage && (
        <button onClick={goPrevPage} className="btn btn-warning mx-1">
          Previous page
        </button>
      )}
      {goNextPage && (
        <button onClick={goNextPage} className="btn btn-warning ms-1">
          Next page
        </button>
      )}
    </div>
  );
}
