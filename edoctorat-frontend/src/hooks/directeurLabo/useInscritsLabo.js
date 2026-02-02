import { useQuery } from "@tanstack/react-query";
import { getCandidatsInscrits } from "../../api/directeurLaboApi/candidatInscritsLabo";

export const useInscrits = ({ page, size }) => {
  return useQuery({
    queryKey: ["inscrits", page, size],
    queryFn: () => getCandidatsInscrits({ page, size }),
    keepPreviousData: true
  });
};
