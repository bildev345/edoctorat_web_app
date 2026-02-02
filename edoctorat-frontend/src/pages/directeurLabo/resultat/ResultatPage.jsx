import { useState } from "react";
import { Button } from "react-bootstrap";
import  ResultatsCommissionsTable from "../../../components/directeurLabo/resultatTable";
import { useResultatsCommissions } from "../../../hooks/directeurLabo/useResultat";

export default function ResultatsPage() {
  const [page, setPage] = useState(0);
  const size = 10;

  const { data, isFetching } = useResultatsCommissions(page, size);

  return (
    <div className="p-3">
      <h4 className="mb-3">Résultats des examens</h4>

      <ResultatsCommissionsTable page={page} size={size} />

      {/* Pagination */}
      {data && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Button
            variant="secondary"
            disabled={page === 0}
            onClick={() => setPage(p => p - 1)}
          >
            ◀ Précédent
          </Button>

          <span>
            Page {page + 1} / {data.totalPages}
            {isFetching && " ⏳"}
          </span>

          <Button
            variant="secondary"
            disabled={page + 1 >= data.totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            Suivant ▶
          </Button>
        </div>
      )}
    </div>
  );
}
