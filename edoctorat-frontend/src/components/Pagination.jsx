export const Pagination = ({ meta, onPageChange }) => {
  const { page, totalPages } = meta;

  const go = (p) => onPageChange(p);

  return (
    <nav className="d-flex justify-content-end mt-3">
      <ul className="pagination mb-0">
        <li className={`page-item ${page <= 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => go(page - 1)}>Précédent</button>
        </li>

        <li className="page-item disabled">
          <span className="page-link">
            {page} / {totalPages}
          </span>
        </li>

        <li className={`page-item ${page >= totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => go(page + 1)}>Suivant</button>
        </li>
      </ul>
    </nav>
  );
};
