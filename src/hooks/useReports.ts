import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export function useMonthlyTrend(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ["reports", "monthly-trend", startDate, endDate],
    queryFn: () => api.getMonthlyTrend({ startDate, endDate }),
  });
}

export function useCategoryAnalysis(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ["reports", "category-analysis", startDate, endDate],
    queryFn: () => api.getCategoryAnalysis({ startDate, endDate }),
  });
}

export function useDashboardReport(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ["reports", "dashboard", startDate, endDate],
    queryFn: () => api.getDashboardReport({ startDate, endDate }),
  });
}
