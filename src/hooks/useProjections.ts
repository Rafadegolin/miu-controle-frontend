import { useQuery } from "@tanstack/react-query";
import { projectionsActions } from "@/services/projections.actions";

export function useProjections(months: number) {
  return useQuery({
    queryKey: ["projections", months],
    queryFn: () => projectionsActions.getCashFlow(months),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
