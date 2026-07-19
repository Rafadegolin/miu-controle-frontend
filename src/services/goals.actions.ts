import { apiClient } from "./api-client";
import type {
  Goal,
  CreateGoalDto,
  ContributeGoalDto,
  GoalSummaryResponse,
  AddPurchaseLinkDto,
  PurchaseLinksSummaryResponse,
} from "@/types/api";

interface GoalContributionResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contribution: any;
  goal: Goal;
}

interface GoalMessageResult {
  message: string;
  goal: Goal;
}

export const goalsActions = {
  async getGoals(status?: string): Promise<Goal[]> {
    const res = await apiClient.get<Goal[]>("/goals", {
      params: status ? { status } : undefined,
    });
    return res.data;
  },

  async getGoal(id: string): Promise<Goal> {
    const res = await apiClient.get<Goal>(`/goals/${id}`);
    return res.data;
  },

  async createGoal(
    data: CreateGoalDto & {
      parentId?: string;
      distributionStrategy?: "PROPORTIONAL" | "SEQUENTIAL";
    },
  ): Promise<Goal> {
    // Hierarquia via API pública não é suportada (parentId/distributionStrategy
    // fora do DTO → 400 por whitelist estrita). Envia só campos permitidos.
    const payload: CreateGoalDto = {
      name: data.name,
      description: data.description,
      targetAmount: data.targetAmount,
      targetDate: data.targetDate,
      color: data.color,
      icon: data.icon,
      priority: data.priority,
    };
    const res = await apiClient.post<Goal>("/goals", payload);
    return res.data;
  },

  async updateGoal(id: string, data: Partial<CreateGoalDto>): Promise<Goal> {
    const res = await apiClient.patch<Goal>(`/goals/${id}`, data);
    return res.data;
  },

  async deleteGoal(id: string): Promise<{ message: string }> {
    const res = await apiClient.delete<{ message: string }>(`/goals/${id}`);
    return res.data;
  },

  async contributeToGoal(
    id: string,
    data: ContributeGoalDto,
  ): Promise<GoalContributionResult> {
    const res = await apiClient.post<GoalContributionResult>(
      `/goals/${id}/contribute`,
      data,
    );
    return res.data;
  },

  async withdrawFromGoal(
    id: string,
    amount: number,
  ): Promise<GoalContributionResult> {
    const res = await apiClient.post<GoalContributionResult>(
      `/goals/${id}/withdraw`,
      { amount },
    );
    return res.data;
  },

  async getGoalsSummary(): Promise<GoalSummaryResponse> {
    const res = await apiClient.get<
      Omit<GoalSummaryResponse, "overallPercentage"> & {
        overallProgress?: number;
        overallPercentage?: number;
      }
    >("/goals/summary");
    const d = res.data;
    return {
      total: d.total,
      active: d.active,
      completed: d.completed,
      cancelled: d.cancelled,
      totalTargeted: d.totalTargeted,
      totalSaved: d.totalSaved,
      overallPercentage: d.overallProgress ?? d.overallPercentage ?? 0,
      goals: d.goals ?? [],
    };
  },

  async uploadGoalImage(id: string, file: File): Promise<GoalMessageResult> {
    const form = new FormData();
    form.append("image", file);
    const res = await apiClient.post<GoalMessageResult>(
      `/goals/${id}/image`,
      form,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return res.data;
  },

  async deleteGoalImage(id: string): Promise<GoalMessageResult> {
    const res = await apiClient.delete<GoalMessageResult>(`/goals/${id}/image`);
    return res.data;
  },

  async addPurchaseLink(
    goalId: string,
    data: AddPurchaseLinkDto,
  ): Promise<GoalMessageResult> {
    const res = await apiClient.post<GoalMessageResult>(
      `/goals/${goalId}/purchase-links`,
      data,
    );
    return res.data;
  },

  async updatePurchaseLink(
    goalId: string,
    linkId: string,
    data: Partial<AddPurchaseLinkDto>,
  ): Promise<GoalMessageResult> {
    const res = await apiClient.patch<GoalMessageResult>(
      `/goals/${goalId}/purchase-links/${linkId}`,
      data,
    );
    return res.data;
  },

  async deletePurchaseLink(
    goalId: string,
    linkId: string,
  ): Promise<GoalMessageResult> {
    const res = await apiClient.delete<GoalMessageResult>(
      `/goals/${goalId}/purchase-links/${linkId}`,
    );
    return res.data;
  },

  async getPurchaseLinksSummary(
    goalId: string,
  ): Promise<PurchaseLinksSummaryResponse> {
    const res = await apiClient.get<PurchaseLinksSummaryResponse>(
      `/goals/${goalId}/purchase-links/summary`,
    );
    return res.data;
  },
};
