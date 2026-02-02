import api from "../axios";

const unwrap = (res) => res?.data?.data ?? res?.data;

export const fetchAllInscriptions = async () => {
  const res = await api.get("/prof/inscriptions");
  return unwrap(res); // List<CandidatInscriptionDto>
};

export const fetchInscriptionsBySujet = async (sujetId) => {
  const res = await api.get(`/prof/inscriptions/sujet/${sujetId}`);
  return unwrap(res); // List<CandidatInscriptionDto>
};
