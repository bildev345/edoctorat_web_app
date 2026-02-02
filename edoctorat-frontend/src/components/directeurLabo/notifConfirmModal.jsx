export const NotifConfirmModal = () => {
    return (
  <Modal show={showConfirmModal}>
  <Modal.Body>
    Confirmer l’envoi des notifications ?
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
      Annuler
    </Button>
    <Button
      variant="danger"
      onClick={async () => {
        await sendBulkNotifications(notificationPayload);
        toast.success("Notifications envoyées");
        setShowConfirmModal(false);
      }}
    >
      Confirmer
    </Button>
  </Modal.Footer>
</Modal>
    )
}
