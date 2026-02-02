export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(page - 1)}
          >
            Précédent
          </button>
        </li>

        {[...Array(totalPages)].map((_, i) => (
          <li
            key={i}
            className={`page-item ${i === page ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(i)}
            >
              {i + 1}
            </button>
          </li>
        ))}

        <li
          className={`page-item ${
            page === totalPages - 1 ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(page + 1)}
          >
            Suivant
          </button>
        </li>
      </ul>
    </nav>
  );
}
