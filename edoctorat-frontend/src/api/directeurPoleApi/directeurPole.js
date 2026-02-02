import axios from "../axios"; // Ensure your axios baseURL includes '/api'

// --- Existing functions ---
export const getSujetsPole = (page = 0) =>
  axios.get(`/directeurPole/sujets?page=${page}`);

export const getCandidatsPole = (page = 0) =>
  axios.get(`/directeurPole/candidats?page=${page}`);

export const getCommissionsPole = (page = 0) =>
  axios.get(`/directeurPole/commissions?page=${page}`);

export const getCalendrierPole = () => {
  return axios.get('/directeurPole/calendrier');
};

export const updateCalendrierPole = async ({id, dateDebut, dateFin, action}) => {
  const { data } = await axios.put(
    `/directeurPole/calendrier/${id}`, {
        dateDebut,
        dateFin,
        action
      }
  );
  console.log("from api: ",data);
  return data;
};

export const publierSujetsPole = async() => {
  const {data} = await axios.put(`/directeurPole/sujets/publier`);
  console.log("Réponse de publication: ", data);
  return {message : data.message, success : data.success}; 
}
export const getResultatsPole = async (decision, page = 0) => {
  //console.log("Calling getResultatsPole with:", { decision, page });
  
  return axios.get(`/directeurPole/resultats/${decision}?page=${page}`)
    .then(response => {
      //console.log("getResultatsPole backend response:", response.data);
      return response;
    })
    .catch(error => {
      console.error("Error in getResultatsPole:", error);
      throw error;
    });
};


export const publierDecision = (decision) =>
  axios.put(`/directeurPole/resultats/publier/${decision}`);

// --- CORRECTED FUNCTIONS FOR INSCRIPTIONS ---

export const getInscriptions = (page = 0, size = 10) => {
  // Matches Controller: @GetMapping("/inscriptions")
  return axios.get(`/directeurPole/inscriptions`, {
    params: { page, size } // Removed 'type' because backend doesn't use it yet
  }).then(res => res.data);
};

export const downloadInscriptionsFile = () => {
  // FIXED: Matches Controller: @GetMapping("/inscriptions/rapport")
  return axios.get(`/directeurPole/inscriptions/rapport`, {
    responseType: "blob" 
  });
};

/*export const DirecteurPoleApi = {
    getSujetsPole,
    getCandidatsPole,
    getCommissionsPole,
    getCalendrierPole,
    updateCalendrierPole,
    publierSujetsPole,
    getResultatsPole,
    publierDecision,
    getInscriptions,
    downloadInscriptionsFile
};*/