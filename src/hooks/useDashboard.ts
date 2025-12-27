import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export function useDashboard() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["dashboard", "home"],
    queryFn: () => api.getDashboardHome(),
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
