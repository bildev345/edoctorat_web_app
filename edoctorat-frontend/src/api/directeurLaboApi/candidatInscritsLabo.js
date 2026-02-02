import api from "../axios";

export const getCandidatsInscrits = async ({ page, size }) => {
  const { data } = await api.get("/directeurLabo/inscrits", {
    params: { page, size }
  });
  console.log("Candidats inscrits labo", data);
  return data;
};
