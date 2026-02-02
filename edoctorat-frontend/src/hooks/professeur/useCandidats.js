import { useQuery } from "@tanstack/react-query";
import { fetchCandidats, fetchCandidatById } from "../../api/professeurApi/candidats";

export const useCandidats = () => {
  return useQuery({
    queryKey: ["prof", "candidats"],
    queryFn: fetchCandidats,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCandidatDetail = (id) => {
  return useQuery({
    queryKey: ["prof", "candidats", id],
    queryFn: () => fetchCandidatById(id),
    enabled: !!id,
  });
};
