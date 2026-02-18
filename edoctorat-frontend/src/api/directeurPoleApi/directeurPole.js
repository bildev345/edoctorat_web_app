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
  return axios.get(`/directeurPole/resultats/${decision}?page=${page}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error("Error in getResultatsPole:", error);
      throw error;
    });
};

export const publierDecision = (decision) =>
  axios.put(`/directeurPole/resultats/publier/${decision}`);

// --- Functions for Inscriptions ---

export const getInscriptions = async(page = 0, size = 10) => {
  return axios.get(`/directeurPole/inscriptions`, {
    params: { page, size }
  }).then(res => res.data);
};

export const downloadInscriptionsFile = async () => {
  try {
    const response = await axios.get(`/directeurPole/inscriptions/rapport`, {
      responseType: "blob" 
    });
    
    // Create a blob from the response
    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
    
    // Create a temporary URL for the blob
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary anchor element and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Rapport_Inscriptions_Pole.csv');
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return response;
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
};