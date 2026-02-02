import api from "../axios";

const unwrap = (res) => res?.data?.data ?? res?.data;

export async function fetchScolariteDashboardStats() {
  const inscriptions = await api.get("/scolarite/inscriptions").then(unwrap);
  return {
    inscriptionsCount: Array.isArray(inscriptions) ? inscriptions.length : 0,
  };
}
