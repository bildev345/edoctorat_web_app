import api from "../axios";

const unwrap = (res) => res?.data?.data ?? res?.data;

export const fetchResultats = async () => {
  const res = await api.get("/prof/resultats");
  return unwrap(res); // List<ResultatProfDto>
};
