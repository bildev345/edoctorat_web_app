import api from "../axios"; // ✅ adapte si ton fichier axios est ailleurs

const unwrap = (res) => res?.data?.data ?? res?.data;

// ✅ GET /prof/commissions
export const fetchCommissions = async () => {
  const res = await api.get("/prof/commissions");
  return unwrap(res);
};

// ✅ GET /prof/commissions/{commissionId}/sujets
export const fetchSujetsByCommission = async (commissionId) => {
  if (!commissionId) throw new Error("commissionId manquant");
  const res = await api.get(`/prof/commissions/${commissionId}/sujets`);
  return unwrap(res);
};

// ✅ GET /prof/commissions/{commissionId}/sujets/{sujetId}/candidats
export const fetchCandidatsByCommissionSujet = async ({ commissionId, sujetId }) => {
  if (!commissionId || !sujetId) throw new Error("commissionId/sujetId manquant");
  const res = await api.get(`/prof/commissions/${commissionId}/sujets/${sujetId}/candidats`);
  return unwrap(res);
};

// ✅ GET /prof/commissions/{commissionId}/sujets/{sujetId}/pv.pdf  (Blob)
export const downloadPvPdf = async ({ commissionId, sujetId }) => {
  if (!commissionId || !sujetId) throw new Error("commissionId/sujetId manquant");

  const res = await api.get(`/prof/commissions/${commissionId}/sujets/${sujetId}/pv.pdf`, {
    responseType: "blob",
  });

  return res.data; // Blob
};
