import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSujetsPole,
  publierSujetsPole
} from "../../api/directeurPoleApi/directeurPole";

export const useSujetsPole = (page) =>
  useQuery({
    queryKey: ["sujetsPole", page],
    queryFn: () => getSujetsPole(page).then((r) => r.data),
    keepPreviousData: true,
  });

export const usePublierSujets = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => publierSujetsPole(),
    onSuccess: () => {
      queryClient.invalidateQueries(["sujetsPole"]);
    },
  });
};

