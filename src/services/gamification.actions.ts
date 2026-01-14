import { apiClient } from "./api-client";
// Tipos placeholder - atualizar conforme types/api.ts evoluir
export interface GamificationProfile {
  level: number;
  currentXp: number;
  nextLevelXp: number;
  streak: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  rewardXp: number;
  isCompleted: boolean;
  isClaimed: boolean;
}

export const gamificationActions = {
  async getProfile(): Promise<GamificationProfile> {
    const response = await apiClient.get<GamificationProfile>("/gamification/profile");
    return response.data;
  },

  async getMissions(): Promise<Mission[]> {
    const response = await apiClient.get<Mission[]>("/gamification/missions");
    return response.data;
  },

  async claimMissionReward(missionId: string): Promise<{ newXp: number; leveledUp: boolean }> {
    const response = await apiClient.post(`/gamification/missions/${missionId}/claim`);
    return response.data;
  }
};
