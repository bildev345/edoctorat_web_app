import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCandidatsLookup, fetchSujetsLookup } from "../../api/scolariteApi/lookups";

export default function CreateInscriptionModal({ open, onClose, onSubmit, isPending }) {
  const [candidatId, setCandidatId] = useState("");
  const [sujetId, setSujetId] = useState("");
  const [dateDeposerDossier, setDateDeposerDossier] = useState("");
  const [remarque, setRemarque] = useState("");

  const { data: candidats = [] } = useQuery({
    queryKey: ["scolarite", "lookup", "candidats"],
    queryFn: fetchCandidatsLookup,
    enabled: open,
    staleTime: 5 * 60 * 1000,
  });

  const { data: sujets = [] } = useQuery({
    queryKey: ["scolarite", "lookup", "sujets"],
    queryFn: fetchSujetsLookup,
    enabled: open,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!open) return;

    // reset
    setCandidatId("");
    setSujetId("");
    setDateDeposerDossier("");
    setRemarque("");

    // lock scroll (comme bootstrap)
    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";

    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
    };
  }, [open]);

  const candidatsOptions = useMemo(() => (Array.isArray(candidats) ? candidats : []), [candidats]);
  const sujetsOptions = useMemo(() => (Array.isArray(sujets) ? sujets : []), [sujets]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!candidatId || !sujetId || !dateDeposerDossier) return;

    onSubmit({
      candidatId: Number(candidatId),
      sujetId: Number(sujetId),
      dateDeposerDossier,
      remarque,
    });
  };

  const closeOnBackdrop = (e) => {
    // ferme seulement si clic EXACT sur le backdrop (pas sur le contenu)
    if (e.target === e.currentTarget) onClose();
  };

  if (!open) return null;

  return createPortal(
    <>
      {/* Backdrop (derrière) */}
      <div className="modal-backdrop fade show" />

      {/* Modal */}
      <div
        className="modal fade show d-block scol-modal"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        onMouseDown={closeOnBackdrop}
      >
        <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: 720 }}>
          <form
            className="modal-content border-0 rounded-4 shadow"
            onSubmit={handleSubmit}
            onMouseDown={(e) => e.stopPropagation()} // empêche fermeture en cliquant dans le contenu
          >
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Ajouter une inscription</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
            </div>

            <div className="modal-body">
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">Candidat</label>
                  <select
                    className="form-select"
                    value={candidatId}
                    onChange={(e) => setCandidatId(e.target.value)}
                    required
                  >
                    <option value="">-- Choisir un candidat --</option>
                    {candidatsOptions.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.cne} — {c.nomCandidatArabe} {c.prenomCandidatArabe}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label">Sujet</label>
                  <select
                    className="form-select"
                    value={sujetId}
                    onChange={(e) => setSujetId(e.target.value)}
                    required
                  >
                    <option value="">-- Choisir un sujet --</option>
                    {sujetsOptions.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.titre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Date dépôt dossier</label>
                  <input
                    type="date"
                    className="form-control"
                    value={dateDeposerDossier}
                    onChange={(e) => setDateDeposerDossier(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Remarque</label>
                  <textarea
                    className="form-control"
                    value={remarque}
                    onChange={(e) => setRemarque(e.target.value)}
                    placeholder="Ex: dossier complet, manque pièce..."
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer border-0">
              <button type="button" className="btn btn-light" onClick={onClose} disabled={isPending}>
                Annuler
              </button>
              <button
                type="submit"
                className="btn btn-dark"
                disabled={isPending || !candidatId || !sujetId || !dateDeposerDossier}
              >
                {isPending ? "Ajout..." : "Ajouter"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body
  );
}
