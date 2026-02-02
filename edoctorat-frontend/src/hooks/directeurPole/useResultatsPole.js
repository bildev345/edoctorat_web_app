import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../api/axios";
import { getResultatsPole } from "../../api/directeurPoleApi/directeurPole";

// 1. Fetch Results (Paginated)
export const useResultatsPole = (decision, page) =>
  useQuery({
    queryKey: ["resultatsPole", decision, page],
    queryFn: () => getResultatsPole(decision, page),
    keepPreviousData: true,
  });

// 2. Publish Results
export const usePublierDecision = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (decision) => axios.put(`/directeurPole/resultats/publier/${decision}`),
    onSuccess: (_, decision) => {
      queryClient.invalidateQueries(["resultatsPole"]); 
    },
    onError: () => {
      // Error handling will be done in component
    }
  });
};

// 3. Download Results (PDF/Excel)
export const useDownloadResultats = () => {
    return useMutation({
        mutationFn: async (decision) => {
            const response = await axios.get(
                `/directeurPole/resultats/download/${decision}`, 
                { responseType: 'blob' } 
            );
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Resultats_${decision}.pdf`);
            document.body.appendChild(link);
            link.click();
            
            link.remove();
            window.URL.revokeObjectURL(url);
        }
    });
}