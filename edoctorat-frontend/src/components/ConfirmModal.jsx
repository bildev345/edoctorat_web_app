export default function ConfirmModal({
  open,
  title = "Confirmer",
  message = "Êtes-vous sûr ?",
  confirmText = "Confirmer",
  cancelText = "Annuler",
  onConfirm,
  onClose,
  isPending,
}) {
  if (!open) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.45)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <p className="mb-0">{message}</p>
          </div>

          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={onClose} disabled={isPending}>
              {cancelText}
            </button>
            <button className="btn btn-dark" onClick={onConfirm} disabled={isPending}>
              {isPending ? "..." : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
