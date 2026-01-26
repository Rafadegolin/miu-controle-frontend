import { useQuery } from "@tanstack/react-query";
import { reportsActions } from "@/services/reports.actions";
import { startOfMonth, endOfMonth, format } from "date-fns";

export interface ReportsFilter {
  startDate: Date;
  endDate: Date;
}

export function useReports(filters?: Partial<ReportsFilter>) {
  // Default to current month if no dates provided
  const now = new Date();
  const defaultStart = startOfMonth(now);
  const defaultEnd = endOfMonth(now);

  const startDate = filters?.startDate || defaultStart;
  const endDate = filters?.endDate || defaultEnd;

  // Format params for API
  const apiParams = {
    startDate: format(startDate, "yyyy-MM-dd"),
    endDate: format(endDate, "yyyy-MM-dd"),
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["reports", "full", apiParams.startDate, apiParams.endDate],
    queryFn: () => reportsActions.getFullReport(apiParams),
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
    filters: {
      startDate,
      endDate,
    },
  };
}
