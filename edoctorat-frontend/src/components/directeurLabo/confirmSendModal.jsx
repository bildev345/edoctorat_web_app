import { Modal, Button } from "react-bootstrap";

export default function ConfirmSendModal({
  show,
  onCancel,
  onConfirm,
  loading,
}) {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Body>
        Confirmer l’envoi des notifications ?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Annuler
        </Button>
        <Button
          variant="danger"
          disabled={loading}
          onClick={onConfirm}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm me-2" />
          )}
          Confirmer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

