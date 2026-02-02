// Notez l'import de 'keepPreviousData' depuis le paquet
// Si vous utilisez v5, l'import est généralement "@tanstack/react-query"
import { useQuery, useMutation, keepPreviousData } from "@tanstack/react-query"; 
import { getInscriptions } from "../../api/directeurPoleApi/directeurPole";

// Hook pour récupérer la liste paginée (Liste Principale)
export const useInscriptions = (page = 0, size = 10) => {
  return useQuery({
    // 1. queryKey est maintenant une propriété de l'objet
    queryKey: ["inscriptions_pole", page], 
    
    // 2. queryFn est aussi une propriété
    queryFn: () => getInscriptions(page, size),
    
    // 3. 'keepPreviousData: true' est remplacé par cette ligne en v5 :
    placeholderData: keepPreviousData, 
    
    // 4. Autres options
    staleTime: 5000,
  });
};

// Hook pour gérer le téléchargement du fichier
export const useDownloadInscriptions = () => {
  return useMutation({
    mutationFn: () => DirecteurPoleApi.downloadInscriptionsFile(),
    onSuccess: () => {
      console.log("Download initiated successfully");
    },
    onError: (err) => {
      console.error("Download failed", err);
      alert("Erreur lors du téléchargement du fichier.");
    }
  });
};