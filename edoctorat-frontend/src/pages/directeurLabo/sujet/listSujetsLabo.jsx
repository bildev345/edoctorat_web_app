import { useState } from "react";
import SujetTable from "../../../components/directeurLabo/sujetTable.jsx";
import RecordModal from "../../../components/directeurLabo/sujetModalForm.jsx";

import { useSujetsLabo, useCreateSujet } from "../../../hooks/directeurLabo/useSujet.js";
import { Plus } from "lucide-react";

const PAGE_SIZE = 10;

export const ListSujetsLabo = () => {
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({ name: "" });
  const [modal, setModal] = useState(null);
  const {data, isLoading} = useSujetsLabo(page, filters);
  console.log("sujetsDtos", data);
  const createMutation = useCreateSujet();


  if (isLoading)
    return (
      <div className="text-center my-5">
        <div className="spinner-border" />
      </div>
    );

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between mb-3">
        <h4>Sujets</h4>
        <button
          className="btn btn-success"
          onClick={() => setModal({ mode: "create" })}
        >
          Ajouter <Plus/>
        </button>
      </div>

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Filter by name"
            value={filters.name}
            onChange={(e) =>
              setFilters({ name: e.target.value })
            }
          />
        </div>
      </div>

      {/* Table */}
      <SujetTable records={data?.content}/>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 0 && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
          </li>

          {[...Array(data?.totalPages)].map((_, i) => (
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
              page + 1 === data?.totalPages && "disabled"
            }`}
          >
            <button
              className="page-link"
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* Create / Update Modal */}
      {modal && (
        <RecordModal
          mode={modal.mode}
          initialData={modal.record}
          loading={createMutation.isLoading}
          onClose={() => setModal(null)}
          onSubmit={(form) => {
              createMutation.mutate(form)
              setModal(null);
          }}
        />
      )}
    </div>
  );
}
