import { useQuery, useMutation, keepPreviousData } from "@tanstack/react-query"; 
import { downloadInscriptionsFile, getInscriptions } from "../../api/directeurPoleApi/directeurPole";

// Hook pour récupérer la liste paginée (Liste Principale)
export const useInscriptions = (page = 0, size = 10) => {
  return useQuery({
    queryKey: ["inscriptions_pole", page], 
    queryFn: () => getInscriptions(page, size),
    placeholderData: keepPreviousData, 
    staleTime: 5000,
  });
};

// Hook pour gérer le téléchargement du fichier
export const useDownloadInscriptions = () => {
  return useMutation({
    mutationFn: () => downloadInscriptionsFile(),
    onSuccess: () => {
      console.log("Fichier téléchargé avec succès");
      // Optional: Show a success toast/notification here
    },
    onError: (err) => {
      console.error("Erreur lors du téléchargement:", err);
      alert("Erreur lors du téléchargement du fichier. Veuillez réessayer.");
    }
  });
};