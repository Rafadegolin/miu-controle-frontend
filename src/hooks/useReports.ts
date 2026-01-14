import { useQuery } from "@tanstack/react-query";
import { reportsActions } from "@/services/reports.actions";

export function useMonthlyTrend(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ["reports", "monthly-trend", startDate, endDate],
    queryFn: () => reportsActions.getMonthlyTrend({ startDate, endDate }),
  });
}

export function useCategoryAnalysis(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ["reports", "category-analysis", startDate, endDate],
    queryFn: () => reportsActions.getCategoryAnalysis({ startDate, endDate }),
  });
}

export function useDashboardReport(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ["reports", "dashboard", startDate, endDate],
    queryFn: () => reportsActions.getDashboardReport({ startDate, endDate }),
  });
}
