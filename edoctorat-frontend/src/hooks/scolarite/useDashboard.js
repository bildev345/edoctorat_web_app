import { useQuery } from "@tanstack/react-query";
import { fetchScolariteDashboardStats } from "../../api/scolariteApi/stats";

export const useScolariteDashboardStats = () =>
  useQuery({
    queryKey: ["scolarite", "dashboard", "stats"],
    queryFn: fetchScolariteDashboardStats,
    staleTime: 2 * 60 * 1000,
  });
