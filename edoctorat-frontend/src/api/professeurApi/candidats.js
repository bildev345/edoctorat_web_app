import api from "../axios";

const unwrap = (res) => res?.data?.data ?? res?.data;

export const fetchCandidats = async () => {
  const res = await api.get("/prof/candidats");
  return unwrap(res); // List<CandidatProfListDto>
};

export const fetchCandidatById = async (id) => {
  const res = await api.get(`/prof/candidats/${id}`);
  return unwrap(res); // CandidatProfDetailDto
};
