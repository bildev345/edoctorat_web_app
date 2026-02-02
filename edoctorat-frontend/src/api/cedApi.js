import api from "./axios"; // Ton instance axios configurée

// Récupérer les sujets
export const getSujetsCed = async () => {
    const response = await api.get("/ced/sujets");
    return response.data;
};

// Récupérer les candidats
export const getCandidatsCed = async () => {
    const response = await api.get("/ced/candidats");
    return response.data;
};

// Récupérer les commissions
export const getCommissionsCed = async () => {
    const response = await api.get("/ced/commissions");
    return response.data;
};

// Récupérer les résultats
export const getResultatsCed = async () => {
    const response = await api.get("/ced/resultats");
    return response.data;
};

// Récupérer les inscrits
export const getInscritsCed = async () => {
    const response = await api.get("/ced/inscrits");
    return response.data;
};

// Générer un rapport (pour ton fichier RapportCed)
export const generateRapportCed = async () => {
    const response = await api.post("/ced/rapport/generate");
    return response.data;
};