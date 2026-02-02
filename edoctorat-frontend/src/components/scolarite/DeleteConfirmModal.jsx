import { createPortal } from "react-dom";
import { useEffect } from "react";

export default function DeleteConfirmModal({
  open,
  title = "Confirmer la suppression",
  message = "Voulez-vous vraiment supprimer cet élément ?",
  confirmText = "Supprimer",
  cancelText = "Annuler",
  isPending = false,
  onClose,
  onConfirm,
}) {
  useEffect(() => {
    if (!open) return;

    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";

    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeOnBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!open) return null;

  return createPortal(
    <>
      <div className="modal-backdrop fade show" />

      <div
        className="modal fade show d-block scol-modal"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        onMouseDown={closeOnBackdrop}
      >
        <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: 520 }}>
          <div
            className="modal-content border-0 rounded-4 shadow"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">{title}</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
            </div>

            <div className="modal-body pt-2">
              <div className="d-flex gap-3 align-items-start">
                <div className="danger-dot" />
                <div>
                  <div className="text-muted">{message}</div>
                  <div className="small text-muted mt-2">Cette action est irréversible.</div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-0 pt-0">
              <button type="button" className="btn btn-light" onClick={onClose} disabled={isPending}>
                {cancelText}
              </button>
              <button type="button" className="btn btn-dark" onClick={onConfirm} disabled={isPending}>
                {isPending ? "Suppression..." : confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
