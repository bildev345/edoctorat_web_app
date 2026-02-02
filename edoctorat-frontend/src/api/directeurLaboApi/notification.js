import api from "../axios";

export const sendBulkNotifications = async (payload) => {
  await api.post("/directeurLabo/createNotifs", payload);
};
export const sendNotifications = async () => {
  await sendBulkNotifications(notificationPayload);
  toast.success("Notifications envoyées avec succès");
  setShowConfirmModal(false);
};
