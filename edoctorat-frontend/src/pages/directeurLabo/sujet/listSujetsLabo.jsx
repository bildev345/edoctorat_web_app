import { useState, useEffect } from "react";
import SujetTable from "../../../components/directeurLabo/sujetTable.jsx";
import RecordModal from "../../../components/directeurLabo/sujetModalForm.jsx";

import { useSujetsLabo, useCreateSujet } from "../../../hooks/directeurLabo/useSujet.js";
import { Plus, Search, X } from "lucide-react";

const PAGE_SIZE = 10;

export const ListSujetsLabo = () => {
  const [page, setPage] = useState(0);
  const [filterInput, setFilterInput] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [modal, setModal] = useState(null);
  
  const { data, isLoading } = useSujetsLabo(page, debouncedFilter);
  const createMutation = useCreateSujet();

  // Debounce the filter input to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(filterInput);
      setPage(0); // Reset to first page when filter changes
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [filterInput]);

  const handleClearFilter = () => {
    setFilterInput("");
    setDebouncedFilter("");
    setPage(0);
  };

  if (isLoading && !data) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-1">Gestion des Sujets</h4>
          <p className="text-muted mb-0">
            {data?.totalElements || 0} sujet{data?.totalElements !== 1 ? 's' : ''} au total
          </p>
        </div>
        <button
          className="btn btn-success d-flex align-items-center gap-2"
          onClick={() => setModal({ mode: "create" })}
        >
          <Plus size={18} />
          Ajouter un sujet
        </button>
      </div>

      {/* Filters */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                <Search size={16} className="me-2" />
                Rechercher par titre
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Entrez un titre de sujet..."
                  value={filterInput}
                  onChange={(e) => setFilterInput(e.target.value)}
                />
                {filterInput && (
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleClearFilter}
                    title="Effacer le filtre"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              {debouncedFilter && (
                <small className="text-muted">
                  Filtré par: "{debouncedFilter}"
                </small>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="text-center my-5">
          <div className="spinner-border spinner-border-sm" />
          <p className="text-muted mt-2">Chargement...</p>
        </div>
      ) : data?.content?.length > 0 ? (
        <>
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <SujetTable records={data.content} />
            </div>
          </div>

          {/* Pagination */}
          {data.totalPages > 1 && (
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0}
                  >
                    Précédent
                  </button>
                </li>

                {[...Array(data.totalPages)].map((_, i) => (
                  <li
                    key={i}
                    className={`page-item ${i === page ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setPage(i)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    page + 1 === data.totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage(page + 1)}
                    disabled={page + 1 === data.totalPages}
                  >
                    Suivant
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      ) : (
        <div className="alert alert-info text-center">
          <h5>Aucun sujet trouvé</h5>
          {debouncedFilter ? (
            <p className="mb-0">
              Aucun résultat pour "{debouncedFilter}".{" "}
              <button
                className="btn btn-link p-0"
                onClick={handleClearFilter}
              >
                Effacer le filtre
              </button>
            </p>
          ) : (
            <p className="mb-0">
              Commencez par ajouter un nouveau sujet.
            </p>
          )}
        </div>
      )}

      {/* Create Modal */}
      {modal && (
        <RecordModal
          initialData={modal.record}
          loading={createMutation.isPending}
          onClose={() => setModal(null)}
          onSubmit={(form) => {
            createMutation.mutate(form, {
              onSuccess: () => {
                setModal(null);
              }
            });
          }}
        />
      )}
    </div>
  );
};