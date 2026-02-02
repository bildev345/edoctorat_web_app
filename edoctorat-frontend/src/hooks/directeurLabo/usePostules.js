import { useQuery } from "@tanstack/react-query";
import { getCandidatsPostules } from "../../api/directeurLaboApi/candidatPostulesLabo";

export const usePostules = ({ page, size }) => {
  return useQuery({
    queryKey: ["postules", page, size],
    queryFn: () => getCandidatsPostules({ page, size }),
    keepPreviousData: true, // important for pagination UX
  });
};
