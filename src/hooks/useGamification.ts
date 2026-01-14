import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { gamificationActions } from "@/services/gamification.actions";

export function useGamificationProfile() {
  return useQuery({
    queryKey: ["gamification", "profile"],
    queryFn: () => gamificationActions.getProfile(),
  });
}

export function useMissions() {
  return useQuery({
    queryKey: ["gamification", "missions"],
    queryFn: () => gamificationActions.getMissions(),
  });
}

export function useClaimMissionReward() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (missionId: string) => gamificationActions.claimMissionReward(missionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gamification", "profile"] });
      queryClient.invalidateQueries({ queryKey: ["gamification", "missions"] });
    },
  });
}
