import { useEffect, useState } from "react";

export default function ValidationModal({ open, inscription, onClose, onSubmit, isPending }) {
  const [valider, setValider] = useState(true);
  const [remarque, setRemarque] = useState("");

  useEffect(() => {
    if (!open) return;
    setValider(inscription?.valider ?? true);
    setRemarque(inscription?.remarque ?? "");
  }, [open, inscription]);

  if (!open) return null;

  const fullName = `${inscription?.nomCandidatArabe ?? "-"} ${inscription?.prenomCandidatArabe ?? ""}`.trim();

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.45)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Validation inscription</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <div className="small text-muted mb-2">Candidat</div>
            <div className="fw-semibold">{fullName}</div>
            <div className="text-muted">CNE: {inscription?.cne ?? "-"}</div>

            <hr />

            <div className="mb-3">
              <label className="form-label">Décision</label>
              <select
                className="form-select"
                value={valider ? "VALIDER" : "REFUSER"}
                onChange={(e) => setValider(e.target.value === "VALIDER")}
              >
                <option value="VALIDER">Valider</option>
                <option value="REFUSER">Refuser</option>
              </select>
            </div>

            <div className="mb-2">
              <label className="form-label">Remarque (optionnel)</label>
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
              onClick={() => onSubmit({ valider, remarque })}
            >
              {isPending ? "..." : "Enregistrer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
