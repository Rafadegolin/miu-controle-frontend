import { apiClient } from "./api-client";

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

interface ProfileApi {
  level: number;
  currentXp: number;
  streakCurrent: number;
  streakLongest: number;
  nextLevelXp: number;
  progress: number;
}

interface UserMissionApi {
  id: string;
  status: "ACTIVE" | "COMPLETED" | "EXPIRED" | "FAILED";
  progress: number;
  target: number;
  mission: {
    title: string;
    description: string;
    xpReward: number;
  };
}

export const gamificationActions = {
  async getProfile(): Promise<GamificationProfile> {
    const res = await apiClient.get<ProfileApi>("/gamification/profile");
    const p = res.data;
    return {
      level: p.level,
      currentXp: p.currentXp,
      nextLevelXp: p.nextLevelXp,
      streak: p.streakCurrent,
    };
  },

  async getMissions(): Promise<Mission[]> {
    const res = await apiClient.get<UserMissionApi[]>("/gamification/missions");
    return res.data.map((m) => ({
      id: m.id,
      title: m.mission.title,
      description: m.mission.description,
      rewardXp: m.mission.xpReward,
      isCompleted: m.status === "COMPLETED",
      // O backend concede a recompensa automaticamente ao concluir — não há
      // "resgate" manual, então concluída == coletada.
      isClaimed: m.status === "COMPLETED",
    }));
  },

  // Mantido por compatibilidade com o hook; o backend não expõe resgate manual
  // (a recompensa é concedida automaticamente ao concluir a missão).
  async claimMissionReward(
    _missionId?: string,
  ): Promise<{ newXp: number; leveledUp: boolean }> {
    void _missionId;
    return { newXp: 0, leveledUp: false };
  },
};
