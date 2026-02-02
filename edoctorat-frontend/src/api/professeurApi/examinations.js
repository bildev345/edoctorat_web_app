import api from "../axios";

const unwrap = (res) => res?.data?.data ?? res?.data;

export const fetchExamination = async ({ commissionId, sujetId, candidatId }) => {
  const res = await api.get(
    `/prof/commissions/${commissionId}/sujets/${sujetId}/candidats/${candidatId}/examination`
  );
  return unwrap(res); // ExaminationDTO ou null
};

export const createExamination = async ({ commissionId, sujetId, candidatId, payload }) => {
  const res = await api.post(
    `/prof/commissions/${commissionId}/sujets/${sujetId}/candidats/${candidatId}/examination`,
    payload
  );
  return unwrap(res);
};

export const updateExamination = async ({ commissionId, sujetId, candidatId, payload }) => {
  const res = await api.put(
    `/prof/commissions/${commissionId}/sujets/${sujetId}/candidats/${candidatId}/examination`,
    payload
  );
  return unwrap(res);
};
