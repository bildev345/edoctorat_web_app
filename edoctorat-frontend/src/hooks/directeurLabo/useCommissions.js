import { useMutation, useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { 
    createCommission, 
    deleteCommission, 
    fetchCommissions, 
    updateCommission 
} from "../../api/directeurLaboApi/commissionLabo"; // Check path

export const useCommissions = (page) => {
  return useQuery({
    queryKey: ["commissions", page],
    queryFn: () => fetchCommissions({ page, size: 10 }),
    placeholderData: keepPreviousData, // V5 syntax
    staleTime: 5000
  });
};

export const useCreateCommission = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createCommission,
    onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["commissions"] });
        // Optional: Show toast here
    }
  });
};

export const useUpdateCommission = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateCommission,
    onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["commissions"] });
    }
  });
};

export const useDeleteCommission = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteCommission,
    onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["commissions"] });
    }
  });
};