import api from "../axios";

export const getCandidatsPostules = async ({ page, size }) => {
  const { data } = await api.get("/directeurLabo/candidatsPostules", {
    params: { page, size },
  });
  return data;
};