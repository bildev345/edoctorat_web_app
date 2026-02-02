import { useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";

import SujetModalForm from "../../../components/professeur/SujetModalForm";
import ConfirmModal from "../../../components/ConfirmModal";
import { paginate } from "../../../components/paginate";
import { Pagination } from "../../../components/Pagination";
import {
  useCreateSujet,
  useDeleteSujet,
  useSujets,
  useUpdateSujet,
} from "../../../hooks/professeur/useSujets";

const PER_PAGE = 10;

export default function ListSujets() {
  const { data: sujets = [], isLoading, isError, error } = useSujets();
  const createMut = useCreateSujet();
  const updateMut = useUpdateSujet();
  const deleteMut = useDeleteSujet();

  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const [modal, setModal] = useState({ open: false, mode: "create", current: null });
  const [confirm, setConfirm] = useState({ open: false, sujet: null });

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return sujets;

    return (sujets || []).filter((s) => {
      const titre = (s.titre ?? "").toLowerCase();
      const desc = (s.description ?? "").toLowerCase();
      const fd = (s.titreFormationDoctoral ?? "").toLowerCase();
      const cd = (s.coDirecteurLabel ?? "").toLowerCase();
      return (
        titre.includes(query) ||
        desc.includes(query) ||
        fd.includes(query) ||
        cd.includes(query)
      );
    });
  }, [sujets, q]);

  const meta = useMemo(() => paginate(filtered, page, PER_PAGE), [filtered, page]);

  const openCreate = () => setModal({ open: true, mode: "create", current: null });
  const openUpdate = (sujet) => setModal({ open: true, mode: "update", current: sujet });
  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  const askDelete = (sujet) => setConfirm({ open: true, sujet });
  const closeConfirm = () => setConfirm({ open: false, sujet: null });

  const handleSubmit = (payload) => {
    if (modal.mode === "create") {
      createMut.mutate(payload, { onSuccess: closeModal });
    } else {
      updateMut.mutate(
        { sujetId: modal.current.sujetId, payload },
        { onSuccess: closeModal }
      );
    }
  };

  const confirmDelete = () => {
    const sujetId = confirm?.sujet?.sujetId;
    if (!sujetId) return;
    deleteMut.mutate(sujetId, { onSuccess: closeConfirm });
  };

  const onSearchChange = (val) => {
    setPage(1);
    setQ(val);
  };

  if (isLoading) return <div className="alert alert-info">Chargement...</div>;

  if (isError) {
    return (
      <div className="alert alert-danger">
        Erreur lors du chargement des sujets.
        <div className="small mt-2 text-muted">
          {error?.response?.data?.message || error?.message || ""}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Mes sujets</h3>

        <button className="btn btn-dark d-flex align-items-center gap-2" onClick={openCreate}>
          <Plus size={18} /> Ajouter
        </button>
      </div>

      {/* Recherche */}
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <div className="input-group" style={{ maxWidth: 720 }}>
            <span className="input-group-text bg-white">
              <Search size={18} />
            </span>
            <input
              className="form-control"
              placeholder="Rechercher (titre / description / formation / co-directeur)"
              value={q}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: 260 }}>Titre</th>
                <th>Description</th>
                <th style={{ width: 220 }}>Co-directeur</th>
                <th style={{ width: 320 }}>Formation doctorale</th>
                <th className="text-center" style={{ width: 120 }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {meta.data.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    Aucun sujet
                  </td>
                </tr>
              ) : (
                meta.data.map((s) => (
                  <tr key={String(s.sujetId)}>
                    <td className="fw-semibold">{s.titre}</td>

                    <td style={{ maxWidth: 520 }}>
                      <div className="text-truncate">{s.description}</div>
                    </td>

                    <td>{s.coDirecteurLabel || "-"}</td>
                    <td>{s.titreFormationDoctoral || "-"}</td>

                    <td className="text-center">
                      <div className="d-inline-flex gap-3 align-items-center">
                        {/* ✅ Pencil au lieu de Edit */}
                        <button
                          type="button"
                          className="icon-action icon-edit"
                          title="Modifier"
                          onClick={() => openUpdate(s)}
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          type="button"
                          className="icon-action icon-delete"
                          title="Supprimer"
                          onClick={() => askDelete(s)}
                          disabled={deleteMut.isPending}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="card-body d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Total: {meta.total} — Page {meta.page}/{meta.totalPages}
          </small>
          <Pagination meta={meta} onPageChange={setPage} />
        </div>
      </div>

      {/* Modal ajout/modif */}
      <SujetModalForm
        open={modal.open}
        mode={modal.mode}
        initialValue={modal.current}
        onClose={closeModal}
        onSubmit={handleSubmit}
        isPending={createMut.isPending || updateMut.isPending}
      />

      {/* Confirm suppression */}
      <ConfirmModal
        open={confirm.open}
        title="Suppression"
        message={`Supprimer le sujet "${confirm?.sujet?.titre ?? ""}" ?`}
        confirmText="Supprimer"
        cancelText="Annuler"
        onConfirm={confirmDelete}
        onClose={closeConfirm}
        isPending={deleteMut.isPending}
      />
    </div>
  );
}
