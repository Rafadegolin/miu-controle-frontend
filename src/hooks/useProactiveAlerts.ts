import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { proactiveAlertsActions } from "@/services/proactive-alerts.actions";

export function useProactiveAlerts() {
  return useQuery({
    queryKey: ["proactive-alerts"],
    queryFn: () => proactiveAlertsActions.getActiveAlerts(),
    // Poll every minute to check for new alerts (since they are time-sensitive)
    refetchInterval: 1000 * 60, 
  });
}

export function useDismissProactiveAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => proactiveAlertsActions.dismissAlert(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proactive-alerts"] });
    },
  });
}
