import { X } from "lucide-react";

export default function ConfirmModal({
  title = "Confirm",
  message,
  onConfirm,
  onCancel,
  loading,
}) {
  return (
    <div className="modal fade show d-block">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              className="btn-close"
              onClick={onCancel}
              disabled={loading}
            />
          </div>

          <div className="modal-body">
            <p>{message}</p>
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              <X/>
            </button>
            <button
              className="btn btn-danger"
              onClick={onConfirm}
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm me-2" />
              )}
              Delete
            </button>
          </div>

        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </div>
  );
}
