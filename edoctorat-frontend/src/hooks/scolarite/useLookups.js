import { useQuery } from "@tanstack/react-query";
import { fetchCandidatsLookup, fetchSujetsLookup } from "../../api/scolariteApi/lookups";

export const useCandidatsLookup = () =>
  useQuery({
    queryKey: ["scolarite", "lookup", "candidats"],
    queryFn: fetchCandidatsLookup,
    staleTime: 5 * 60 * 1000,
  });

export const useSujetsLookup = () =>
  useQuery({
    queryKey: ["scolarite", "lookup", "sujets"],
    queryFn: fetchSujetsLookup,
    staleTime: 5 * 60 * 1000,
  });
