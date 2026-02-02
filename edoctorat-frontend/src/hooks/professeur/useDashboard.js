import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats } from "../../api/professeurApi/stats";

export const useDashboardStats = () =>
  useQuery({
    queryKey: ["prof", "dashboard", "stats"],
    queryFn: fetchDashboardStats,
    staleTime: 2 * 60 * 1000,
  });
