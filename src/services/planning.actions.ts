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
    // SavePlanDto: whitelist estrita no backend — enviar só estes campos.
    const payload = {
      monthlyDeposit: plan.monthlyDeposit,
      months: plan.months,
      isViable: plan.isViable,
      margin: plan.margin,
      recommendations: plan.recommendations ?? [],
      actionPlan: plan.actionPlan ?? [],
      suggestedCuts: plan.suggestedCuts ?? [],
    };
    const response = await apiClient.post<GoalPlan>(
      `/planning/goal/${goalId}/save`,
      payload
    );
    return response.data;
  },
};
