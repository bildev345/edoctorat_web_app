import { useQuery } from "@tanstack/react-query";
import { getCandidatsPole } from "../../api/directeurPoleApi/directeurPole";

export const useCandidatsPole = (page) =>
  useQuery({
    queryKey: ["candidatsPole", page],
    queryFn: () => getCandidatsPole(page).then(res => res.data),
    keepPreviousData: true,
  });
