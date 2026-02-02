import { useQuery } from "@tanstack/react-query";
import { getResultatsCommissions } from "../../api/directeurLaboApi/resultatLabo";

export const useResultatsCommissions = (page, size) =>
  useQuery({
    queryKey: ["resultats", page, size],
    queryFn: () => getResultatsCommissions(page, size),
    keepPreviousData: true
  });
