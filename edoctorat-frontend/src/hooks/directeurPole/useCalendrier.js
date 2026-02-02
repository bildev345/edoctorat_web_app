import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCalendrierPole, updateCalendrierPole } from '../../api/directeurPoleApi/directeurPole';

// Fetch Calendar
export const useCalendrier = () => {
  return useQuery({
    queryKey: ["calendrier"],
    queryFn: async () => {
      const res = await getCalendrierPole();
      return res.data;
    }
  });
};

// Update Calendar Mutation
export const useUpdateCalendrier = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data) => updateCalendrierPole(data), 
    
    onSuccess: () => {
      queryClient.invalidateQueries(["calendrier"]);
    }
  });
};