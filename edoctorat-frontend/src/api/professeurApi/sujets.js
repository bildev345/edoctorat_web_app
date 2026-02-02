import api from "../axios";

// backend: ApiResponse { success, message, data, timestamp }
const unwrap = (res) => res?.data?.data ?? res?.data;

export const fetchSujets = async () => {
  const res = await api.get("/prof/sujets");
  return unwrap(res); // => List<SujetDTO>
};

export const createSujet = async (payload) => {
  const res = await api.post("/prof/sujets", payload);
  return unwrap(res); // => SujetDTO
};

export const updateSujet = async ({ sujetId, payload }) => {
  const res = await api.put(`/prof/sujets/${sujetId}`, payload);
  return unwrap(res); // => SujetDTO
};

export const deleteSujet = async (sujetId) => {
  const res = await api.delete(`/prof/sujets/${sujetId}`);
  return unwrap(res);
};
