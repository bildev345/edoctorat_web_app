import api from "../axios";

const unwrap = (res) => res?.data?.data ?? res?.data;

export async function fetchDashboardStats() {
  const [sujets, candidats, commissions, inscriptions, resultats] = await Promise.all([
    api.get("/prof/sujets").then(unwrap),
    api.get("/prof/candidats").then(unwrap),
    api.get("/prof/commissions").then(unwrap),
    api.get("/prof/inscriptions").then(unwrap),
    api.get("/prof/resultats").then(unwrap),
  ]);

  return {
    sujetsCount: Array.isArray(sujets) ? sujets.length : 0,
    candidatsCount: Array.isArray(candidats) ? candidats.length : 0,
    commissionsCount: Array.isArray(commissions) ? commissions.length : 0,
    inscriptionsCount: Array.isArray(inscriptions) ? inscriptions.length : 0,
    resultatsCount: Array.isArray(resultats) ? resultats.length : 0,
  };
}
