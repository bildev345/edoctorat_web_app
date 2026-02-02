import { useQuery } from "@tanstack/react-query";
import {
  fetchCommissions,
  fetchSujetsByCommission,
  fetchCandidatsByCommissionSujet,
} from "../../api/professeurApi/commissions";

export const useCommissions = () =>
  useQuery({
    queryKey: ["prof-commissions"],
    queryFn: fetchCommissions,
  });

export const useSujetsCommission = (commissionId) =>
  useQuery({
    queryKey: ["prof-sujets", commissionId],
    queryFn: () => fetchSujetsByCommission(commissionId),
    enabled: !!commissionId,
  });

export const useCandidatsCommissionSujet = (commissionId, sujetId) =>
  useQuery({
    queryKey: ["prof-candidats", commissionId, sujetId],
    queryFn: () => fetchCandidatsByCommissionSujet({ commissionId, sujetId }),
    enabled: !!commissionId && !!sujetId,
  });
