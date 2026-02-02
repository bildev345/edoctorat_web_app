import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axios";

export const useCommissionsPole = (page = 0, size = 10) => {
  return useQuery({
    queryKey: ["commissionsPole", page, size],
    queryFn: async () => {
      const { data } = await axios.get(`/directeurPole/commissions?page=${page}&size=${size}`);
      return data;
    },
    keepPreviousData: true,
  });
};