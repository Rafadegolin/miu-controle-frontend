import { apiClient } from "./api-client";
import type { Plan, GoalPlan } from "@/types/planning";

export const planningActions = {
  async calculateGoalPlan(goalId: string): Promise<Plan> {
    const response = await apiClient.get<Plan>(
      `/planning/goal/${goalId}/calculate`
    );
    return response.data;
  },

  async saveGoalPlan(goalId: string, plan: Plan): Promise<GoalPlan> {
    const response = await apiClient.post<GoalPlan>(
      `/planning/goal/${goalId}/save`,
      plan
    );
    return response.data;
  },
};
