import { apiClient } from "./api-client";
import type { Budget, CreateBudgetDto, BudgetStatusResponse } from "@/types/api";

export const budgetsActions = {
  async getBudgets(period?: string): Promise<Budget[]> {
    const response = await apiClient.get<Budget[]>("/budgets", {
      params: { period },
    });
    return response.data;
  },

  async createBudget(data: CreateBudgetDto): Promise<Budget> {
    const response = await apiClient.post<Budget>("/budgets", data);
    return response.data;
  },

  async updateBudget(
    id: string,
    data: Partial<CreateBudgetDto>
  ): Promise<Budget> {
    const response = await apiClient.patch<Budget>(`/budgets/${id}`, data);
    return response.data;
  },

  async deleteBudget(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete(`/budgets/${id}`);
    return response.data;
  },

  async getBudgetStatus(id: string): Promise<BudgetStatusResponse> {
    const response = await apiClient.get<BudgetStatusResponse>(
      `/budgets/${id}/status`
    );
    return response.data;
  }
};
