import { useMemo, useState } from "react";
import { Search, Plus, Pencil, Trash2, CheckCircle2 } from "lucide-react";

import {
  useScolariteInscriptions,
  useCreateInscription,
  useUpdateInscription,
  useDeleteInscription,
} from "../../../hooks/scolarite/useInscriptions";

import ValidationModal from "../../../components/scolarite/ValidationModal";
import CreateInscriptionModal from "../../../components/scolarite/CreateInscriptionModal";
import EditInscriptionModal from "../../../components/scolarite/EditInscriptionModal";
import DeleteConfirmModal from "../../../components/scolarite/DeleteConfirmModal";

const PAGE_SIZE = 10;

export default function ListInscriptions() {
  const { data, isLoading, isError, error } = useScolariteInscriptions();

  const createMut = useCreateInscription();
  const updateMut = useUpdateInscription();
  const deleteMut = useDeleteInscription();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [createOpen, setCreateOpen] = useState(false);
  const [edit, setEdit] = useState({ open: false, row: null });
  const [validation, setValidation] = useState({ open: false, row: null });
  const [del, setDel] = useState({ open: false, row: null });

  const normalized = useMemo(() => {
    const list = Array.isArray(data) ? data : [];
    return list.map((x) => ({
      id: x?.inscriptionId ?? x?.id,
      cne: x?.cne ?? "-",
      nomCandidatArabe: x?.nomCandidatArabe ?? "-",
      prenomCandidatArabe: x?.prenomCandidatArabe ?? "-",
      sujetTitre: x?.sujetTitre ?? "-",
      formationTitre: x?.formationTitre ?? "-",
      laboTitre: x?.laboTitre ?? "-",
      cedTitre: x?.cedTitre ?? "-",
      dateDeposerDossier: x?.dateDeposerDossier ?? null,
      remarque: x?.remarque ?? "",
      valider: x?.valider ?? null,
    }));
  }, [data]);

  const filtered = useMemo(() => {
    if (!search.trim()) return normalized;
    const s = search.toLowerCase();
    return normalized.filter((r) =>
      [r.cne, r.nomCandidatArabe, r.prenomCandidatArabe, r.sujetTitre, r.formationTitre, r.laboTitre, r.cedTitre, r.remarque]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(s))
    );
  }, [normalized, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSafe = Math.min(Math.max(page, 1), totalPages);
  const rows = filtered.slice((pageSafe - 1) * PAGE_SIZE, pageSafe * PAGE_SIZE);

  const pending = createMut.isPending || updateMut.isPending || deleteMut.isPending;

  const onCreate = (payload) => {
    createMut.mutate(payload, { onSuccess: () => setCreateOpen(false) });
  };

  const onEdit = (payload) => {
    const id = edit?.row?.id;
    if (!id) return;
    updateMut.mutate({ id, payload }, { onSuccess: () => setEdit({ open: false, row: null }) });
  };

  const onValidate = ({ valider, remarque }) => {
    const id = validation?.row?.id;
    if (!id) return;
    updateMut.mutate(
      { id, payload: { valider, remarque } },
      { onSuccess: () => setValidation({ open: false, row: null }) }
    );
  };

  const confirmDelete = () => {
    const id = del?.row?.id;
    if (!id) return;
    deleteMut.mutate(id, { onSuccess: () => setDel({ open: false, row: null }) });
  };

  if (isLoading) return <div className="alert alert-info">Chargement...</div>;

  if (isError) {
    return (
      <div className="alert alert-danger">
        Erreur lors du chargement des inscriptions.
        <div className="small mt-2 text-muted">{error?.message || error?.response?.data?.message || ""}</div>
      </div>
    );
  }

  return (
    <div className="container-fluid scol-page">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3 className="m-0">Inscriptions</h3>
          <div className="text-muted small">Créer • Modifier • Valider/Refuser • Supprimer</div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <div className="position-relative scol-search-wrap">
            <Search size={16} className="position-absolute" style={{ left: 10, top: 10, color: "#666" }} />
            <input
              className="form-control ps-5 scol-search"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <button className="btn btn-dark d-flex align-items-center gap-2" onClick={() => setCreateOpen(true)}>
            <Plus size={18} /> Ajouter une inscription
          </button>
        </div>
      </div>

      <div className="table-responsive bg-white border rounded-4">
        <table className="table table-hover mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th>CNE</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Titre Sujet</th>
              <th>Formation doctorale</th>
              <th>Labo</th>
              <th>CED</th>
              <th>Date dépôt</th>
              <th>Remarque</th>
              <th style={{ width: 120 }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center text-muted py-4">
                  Aucune inscription
                </td>
              </tr>
            ) : (
              rows.map((r, idx) => (
                <tr key={`${r.id ?? r.cne}-${idx}`}>
                  <td className="fw-semibold">{r.cne}</td>
                  <td>{r.nomCandidatArabe}</td>
                  <td>{r.prenomCandidatArabe}</td>
                  <td className="fw-semibold">{r.sujetTitre}</td>
                  <td>{r.formationTitre}</td>
                  <td>{r.laboTitre}</td>
                  <td>{r.cedTitre}</td>
                  <td>{r.dateDeposerDossier ? new Date(r.dateDeposerDossier).toLocaleDateString("fr-FR") : "-"}</td>
                  <td>{r.remarque || "-"}</td>
                  <td>
                    <div className="d-flex gap-3 align-items-center">
                      <button
                        className="icon-action"
                        onClick={() => setValidation({ open: true, row: r })}
                        disabled={pending}
                        title="Valider / Refuser"
                      >
                        <CheckCircle2 size={20} />
                      </button>

                      <button
                        className="icon-action"
                        onClick={() => setEdit({ open: true, row: r })}
                        disabled={pending}
                        title="Modifier"
                      >
                        <Pencil size={20} />
                      </button>

                      <button
                        className="icon-action"
                        onClick={() => setDel({ open: true, row: r })}
                        disabled={pending}
                        title="Supprimer"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <small className="text-muted">
          {filtered.length} inscription(s) • Page {pageSafe}/{totalPages}
        </small>

        <div className="btn-group">
          <button className="btn btn-outline-secondary btn-sm" disabled={pageSafe === 1} onClick={() => setPage(pageSafe - 1)}>
            Précédent
          </button>
          <button className="btn btn-outline-secondary btn-sm" disabled={pageSafe === totalPages} onClick={() => setPage(pageSafe + 1)}>
            Suivant
          </button>
        </div>
      </div>

      <CreateInscriptionModal open={createOpen} onClose={() => setCreateOpen(false)} onSubmit={onCreate} isPending={createMut.isPending} />

      <EditInscriptionModal open={edit.open} inscription={edit.row} onClose={() => setEdit({ open: false, row: null })} onSubmit={onEdit} isPending={updateMut.isPending} />

      <ValidationModal open={validation.open} inscription={validation.row} onClose={() => setValidation({ open: false, row: null })} onSubmit={onValidate} isPending={updateMut.isPending} />

      <DeleteConfirmModal
        open={del.open}
        title="Supprimer l’inscription"
        message={`Supprimer l'inscription de ${del?.row?.cne || ""} ?`}
        onClose={() => setDel({ open: false, row: null })}
        onConfirm={confirmDelete}
        isPending={deleteMut.isPending}
      />
    </div>
  );
}
