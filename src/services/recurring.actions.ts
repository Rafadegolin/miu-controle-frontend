import { apiClient } from "./api-client";
import type { RecurringTransaction, CreateRecurringTransactionDto } from "@/types/api";

export const recurringActions = {
  async getRecurringTransactions(
    isActive?: boolean
  ): Promise<RecurringTransaction[]> {
    const response = await apiClient.get<RecurringTransaction[]>(
      "/recurring-transactions",
      {
        params: { isActive },
      }
    );
    return response.data;
  },

  async createRecurringTransaction(
    data: CreateRecurringTransactionDto
  ): Promise<RecurringTransaction> {
    const response = await apiClient.post<RecurringTransaction>(
      "/recurring-transactions",
      data
    );
    return response.data;
  },

  async updateRecurringTransaction(
    id: string,
    data: Partial<CreateRecurringTransactionDto>
  ): Promise<RecurringTransaction> {
    const response = await apiClient.patch<RecurringTransaction>(
      `/recurring-transactions/${id}`,
      data
    );
    return response.data;
  },

  async deleteRecurringTransaction(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete(`/recurring-transactions/${id}`);
    return response.data;
  },

  async toggleRecurringTransaction(id: string): Promise<RecurringTransaction> {
    const response = await apiClient.patch<RecurringTransaction>(
      `/recurring-transactions/${id}/toggle`
    );
    return response.data;
  },
};
