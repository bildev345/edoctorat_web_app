import api from "../axios";

const BASE_ROUTE = "/candidats";

export const CandidatApiService = {
  // --- 1. DOSSIER CANDIDAT ---
  getPays: async () => {
    try {
      const response = await api.get(`${BASE_ROUTE}/pays`);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  saveInfoPerso: async (payload) => {
    try {
      const response = await api.post(`${BASE_ROUTE}/perso`, payload);
      if (response.data && response.data.id) {
        localStorage.setItem("candidatId", response.data.id);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getInfoPerso: async () => {
    try {
      const response = await api.get(`${BASE_ROUTE}/me`);
      // Synchroniser l'ID dans localStorage si besoin
      if (response.data && response.data.id) {
        localStorage.setItem("candidatId", response.data.id);
      }
      return response.data;
    } catch (error) {
      console.error("Erreur profile:", error);
      return null;
    }
  },

  // --- DIPLOMES ---
  getDiplomes: async () => {
    try {
      const response = await api.get(`${BASE_ROUTE}/me/diplomes`);
      return response.data && Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Erreur API diplômes:", error);
      return [];
    }
  },

  addDiplome: async (diplomePayload) => {
    const id = localStorage.getItem("candidatId");
    if (!id) throw new Error("ID Candidat manquant.");

    const response = await api.post(`${BASE_ROUTE}/${id}/diplomes`, diplomePayload);
    return response.data;
  },

  updateProfile: async (formData) => {
    try {
      const response = await api.put(`${BASE_ROUTE}/me`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // --- 2. FILTRES ---
  getCeds: async () => {
    try {
      const response = await api.get(`${BASE_ROUTE}/ceds`);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  getLaboratoires: async (cedId) => {
    try {
      const params = cedId ? { cedId } : {};
      const response = await api.get(`${BASE_ROUTE}/laboratoires`, { params });
      return response.data;
    } catch (error) {
      return [];
    }
  },

  getFormations: async (cedId) => {
    try {
      const params = cedId ? { cedId } : {};
      const response = await api.get(`${BASE_ROUTE}/formations`, { params });
      return response.data;
    } catch (error) {
      return [];
    }
  },

  searchSujets: async (cedId, laboratoireId, formationId) => {
    try {
      const params = {};
      if (cedId) params.cedId = cedId;
      if (laboratoireId) params.laboratoireId = laboratoireId;
      if (formationId) params.formationId = formationId;

      const response = await api.get(`${BASE_ROUTE}/sujets`, { params });
      return response.data;
    } catch (error) {
      return [];
    }
  },

  // --- 3. CANDIDATURES ---
  postuler: async (sujetId) => {
    const idCandidat = localStorage.getItem("candidatId");
    if (!idCandidat) throw new Error("ID Candidat manquant.");

    try {
      const payload = { sujetId };
      const response = await api.post(`${BASE_ROUTE}/${idCandidat}/postuler`, payload);
      return response.data;
    } catch (error) {
      console.error("Erreur postuler:", error);
      throw error;
    }
  },

  removeCandidature: async (sujetId) => {
    const idCandidat = localStorage.getItem("candidatId");
    if (!idCandidat) throw new Error("ID Candidat manquant.");

    try {
      const response = await api.delete(`${BASE_ROUTE}/${idCandidat}/candidatures/${sujetId}`);
      return response.data;
    } catch (error) {
      console.error("Erreur suppression:", error);
      throw error;
    }
  },

  /**
   * ✅ NOUVEAU : retourne une réponse enrichie depuis backend:
   * { dossierValide: boolean, candidatures: [] }
   *
   * Route backend attendue:
   * GET /api/candidats/me/candidatures
   */
  getMyCandidatures: async () => {
    const response = await api.get(`${BASE_ROUTE}/me/candidatures`);
    return response.data;
  },

  /**
   * ✅ NOUVEAU : verrouille définitivement le dossier
   * Route backend attendue:
   * PUT /api/candidats/me/valider-dossier
   */
  validerDossier: async () => {
    const response = await api.put(`${BASE_ROUTE}/me/valider-dossier`);
    return response.data;
  },
 getMyNotifications: async () => {
  const response = await api.get(`${BASE_ROUTE}/me/notifications`);
  return response.data;
},
};

