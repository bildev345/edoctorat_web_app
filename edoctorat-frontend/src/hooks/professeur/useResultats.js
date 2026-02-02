import { useQuery } from "@tanstack/react-query";
import { fetchResultats } from "../../api/professeurApi/resultats";

export const useResultats = () =>
  useQuery({
    queryKey: ["prof", "resultats"],
    queryFn: fetchResultats,
    staleTime: 5 * 60 * 1000,
  });
