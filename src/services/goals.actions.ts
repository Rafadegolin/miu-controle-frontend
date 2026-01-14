import { apiClient } from "./api-client";
import type {
  Goal,
  CreateGoalDto,
  ContributeGoalDto,
  GoalSummaryResponse,
  AddPurchaseLinkDto,
  PurchaseLinksSummaryResponse,
} from "@/types/api";

export const goalsActions = {
  async getGoals(status?: string): Promise<Goal[]> {
    const response = await apiClient.get<Goal[]>("/goals", {
      params: { status },
    });
    return response.data;
  },

  async getGoal(id: string): Promise<Goal> {
    const response = await apiClient.get<Goal>(`/goals/${id}`);
    return response.data;
  },

  async createGoal(data: CreateGoalDto): Promise<Goal> {
    const response = await apiClient.post<Goal>("/goals", data);
    return response.data;
  },

  async updateGoal(id: string, data: Partial<CreateGoalDto>): Promise<Goal> {
    const response = await apiClient.patch<Goal>(`/goals/${id}`, data);
    return response.data;
  },

  async deleteGoal(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete(`/goals/${id}`);
    return response.data;
  },

  async contributeToGoal(
    id: string,
    data: ContributeGoalDto
  ): Promise<{ contribution: any; goal: Goal }> {
    const response = await apiClient.post(`/goals/${id}/contribute`, data);
    return response.data;
  },

  async withdrawFromGoal(
    id: string,
    amount: number
  ): Promise<{ contribution: any; goal: Goal }> {
    const response = await apiClient.post(`/goals/${id}/withdraw`, { amount });
    return response.data;
  },

  async getGoalsSummary(): Promise<GoalSummaryResponse> {
    const response = await apiClient.get<GoalSummaryResponse>("/goals/summary");
    return response.data;
  },

  async uploadGoalImage(
    id: string,
    file: File
  ): Promise<{ message: string; goal: Goal }> {
    const formData = new FormData();
    formData.append("image", file);
    const response = await apiClient.post(`/goals/${id}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  async deleteGoalImage(id: string): Promise<{ message: string; goal: Goal }> {
    const response = await apiClient.delete(`/goals/${id}/image`);
    return response.data;
  },

  async addPurchaseLink(
    goalId: string,
    data: AddPurchaseLinkDto
  ): Promise<{ message: string; goal: Goal }> {
    const response = await apiClient.post(
      `/goals/${goalId}/purchase-links`,
      data
    );
    return response.data;
  },

  async updatePurchaseLink(
    goalId: string,
    linkId: string,
    data: Partial<AddPurchaseLinkDto>
  ): Promise<{ message: string; goal: Goal }> {
    const response = await apiClient.patch(
      `/goals/${goalId}/purchase-links/${linkId}`,
      data
    );
    return response.data;
  },

  async deletePurchaseLink(
    goalId: string,
    linkId: string
  ): Promise<{ message: string; goal: Goal }> {
    const response = await apiClient.delete(
      `/goals/${goalId}/purchase-links/${linkId}`
    );
    return response.data;
  },

  async getPurchaseLinksSummary(
    goalId: string
  ): Promise<PurchaseLinksSummaryResponse> {
    const response = await apiClient.get<PurchaseLinksSummaryResponse>(
      `/goals/${goalId}/purchase-links/summary`
    );
    return response.data;
  }
};
