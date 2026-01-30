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

// Mock Data Store
let mockMissions: Mission[] = [
  {
    id: "1",
    title: "Registrar 3 gastos",
    description: "Adicione 3 novas transações de despesa hoje.",
    rewardXp: 150,
    isCompleted: true,
    isClaimed: false,
  },
  {
    id: "2",
    title: "Bater a meta de água",
    description: "Beba 2 litros de água (exemplo de hábito).",
    rewardXp: 100,
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: "3",
    title: "Revisar Orçamento",
    description: "Acesse a tela de orçamentos.",
    rewardXp: 200,
    isCompleted: true,
    isClaimed: true,
  }
];

let mockProfile: GamificationProfile = {
  level: 5,
  currentXp: 2800,
  nextLevelXp: 5000,
  streak: 12,
};

export const gamificationActions = {
  async getProfile(): Promise<GamificationProfile> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...mockProfile });
      }, 500);
    });
  },

  async getMissions(): Promise<Mission[]> {
     return new Promise((resolve) => {
       setTimeout(() => {
         resolve([...mockMissions]);
       }, 500);
     });
  },

  async claimMissionReward(missionId: string): Promise<{ newXp: number; leveledUp: boolean }> {
     return new Promise((resolve) => {
       setTimeout(() => {
          // Update mock state
          const missionIndex = mockMissions.findIndex(m => m.id === missionId);
          if (missionIndex !== -1) {
            mockMissions[missionIndex].isClaimed = true;
            mockProfile.currentXp += mockMissions[missionIndex].rewardXp;
          }

          resolve({
            newXp: mockProfile.currentXp,
            leveledUp: false,
          });
       }, 800);
     });
  }
};
