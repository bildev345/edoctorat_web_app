import {api} from "../axios";

// Fetch with filters + pagination

export const getSujets = async ({ page, size, filters }) => {
  const { data } = await api.get("/directeurLabo/sujets", {
    params: { page, size, ...filters },
  });
  console.log(data);
  return data; // ⬅ IMPORTANT
};




export const ajouterSujet = async (payload) => {
  const { data } = await api.post("/directeurLabo/sujet/add", payload);
  return data;
};


export const getCandidatsBySujet = async (sujetId) => {
  const { data } = await api.get(
    `/directeurLabo/sujets/${sujetId}/candidats`
  );
  return data;
};
export const getSujetsByCommission = async (commissionId) => {
  const { data } = await api.get(
    `/directeurLabo/commissions/${commissionId}/sujets`
  );
  return data;
};


/*export const modifierSujet = async ({ id, payload }) => {
  const { data } = await api.put(`/records/${id}`, payload);
  return data;
};

export const supprimerSujet = async (id) => {
  await api.delete(`/records/${id}`);
};*/
