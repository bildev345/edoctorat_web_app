import { useEffect, useState } from "react";

export default function EditInscriptionModal({ open, inscription, onClose, onSubmit, isPending }) {
  const [dateDeposerDossier, setDate] = useState("");
  const [remarque, setRemarque] = useState("");

  useEffect(() => {
    if (!open) return;
    setDate(inscription?.dateDeposerDossier?.slice?.(0, 10) || "");
    setRemarque(inscription?.remarque || "");
  }, [open, inscription]);

  if (!open) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.45)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modifier l’inscription</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Date dépôt dossier</label>
              <input
                type="date"
                className="form-control"
                value={dateDeposerDossier}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Remarque</label>
              <textarea
                className="form-control"
                rows="3"
                value={remarque}
                onChange={(e) => setRemarque(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={onClose} disabled={isPending}>
              Annuler
            </button>
            <button
              className="btn btn-dark"
              disabled={isPending}
              onClick={() =>
                onSubmit({
                  dateDeposerDossier: dateDeposerDossier || null,
                  remarque: remarque || null,
                })
              }
            >
              {isPending ? "..." : "Enregistrer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
