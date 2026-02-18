import {api} from "../axios";

// Fetch with filters + pagination
export const getSujets = async ({ page, size, name }) => {
  const params = { page, size };
  
  // Only add name parameter if it's not empty
  if (name && name.trim() !== "") {
    params.name = name;
  }
  
  const { data } = await api.get("/directeurLabo/sujets", { params });
  return data;
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