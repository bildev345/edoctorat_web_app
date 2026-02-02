import api from "../axios";

const unwrap = (res) => res?.data?.data ?? res?.data;

export const fetchInscriptions = async () => {
  const res = await api.get("/scolarite/inscriptions");
  return unwrap(res);
};

export const createInscription = async (payload) => {
  const res = await api.post("/scolarite/inscriptions", payload);
  return unwrap(res);
};

export const updateInscription = async ({ id, payload }) => {
  // ✅ PUT unique (update + validation)
  const res = await api.put(`/scolarite/inscriptions/${id}`, payload);
  return unwrap(res);
};

export const deleteInscription = async (id) => {
  const res = await api.delete(`/scolarite/inscriptions/${id}`);
  return unwrap(res);
};
