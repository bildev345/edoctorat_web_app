import { useQuery } from "@tanstack/react-query";
import {
  fetchAllInscriptions,
  fetchInscriptionsBySujet,
} from "../../api/professeurApi/inscriptions";

export const useAllInscriptions = () =>
  useQuery({
    queryKey: ["prof", "inscriptions"],
    queryFn: fetchAllInscriptions,
    staleTime: 5 * 60 * 1000,
  });

export const useInscriptionsBySujet = (sujetId) =>
  useQuery({
    queryKey: ["prof", "inscriptions", "sujet", sujetId],
    queryFn: () => fetchInscriptionsBySujet(sujetId),
    enabled: !!sujetId,
  });
