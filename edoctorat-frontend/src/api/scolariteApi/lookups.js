import api from "../axios";
const unwrap = (res) => res?.data?.data ?? res?.data;

export const fetchCandidatsLookup = async () => {
  const res = await api.get("/scolarite/candidats");
  return unwrap(res);
};

export const fetchSujetsLookup = async () => {
  const res = await api.get("/scolarite/sujets");
  return unwrap(res);
};
