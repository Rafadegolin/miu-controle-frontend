import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { recommendationsActions } from "@/services/recommendations.actions";

export function useRecommendations() {
  return useQuery({
    queryKey: ["recommendations"],
    queryFn: () => recommendationsActions.getRecommendations(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useApplyRecommendation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => recommendationsActions.applyRecommendation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recommendations"] });
    },
  });
}

export function useDismissRecommendation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => recommendationsActions.dismissRecommendation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recommendations"] });
    },
  });
}
