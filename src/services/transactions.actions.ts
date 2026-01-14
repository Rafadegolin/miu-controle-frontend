import { apiClient } from "./api-client";
import type {
  Transaction,
  CreateTransactionDto,
  TransactionFilters,
  TransactionSummaryResponse,
  TransactionStatsMonthly,
} from "@/types/api";

export const transactionsActions = {
  async getTransactions(filters?: TransactionFilters): Promise<Transaction[]> {
    const response = await apiClient.get<Transaction[]>("/transactions", {
      params: filters,
    });
    return response.data;
  },

  async getTransaction(id: string): Promise<Transaction> {
    const response = await apiClient.get<Transaction>(`/transactions/${id}`);
    return response.data;
  },

  async createTransaction(data: CreateTransactionDto): Promise<Transaction> {
    const response = await apiClient.post<Transaction>("/transactions", data);
    return response.data;
  },

  async updateTransaction(
    id: string,
    data: Partial<CreateTransactionDto>
  ): Promise<Transaction> {
    const response = await apiClient.patch<Transaction>(
      `/transactions/${id}`,
      data
    );
    return response.data;
  },

  async deleteTransaction(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete(`/transactions/${id}`);
    return response.data;
  },

  async uploadReceipt(id: string, file: File): Promise<{ receiptUrl: string }> {
    const formData = new FormData();
    formData.append("receipt", file);
    const response = await apiClient.post(
      `/transactions/${id}/receipt`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  async deleteReceipt(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete(`/transactions/${id}/receipt`);
    return response.data;
  },

  async getTransactionsSummary(filters?: {
    startDate?: string;
    endDate?: string;
    accountId?: string;
  }): Promise<TransactionSummaryResponse> {
    const response = await apiClient.get<TransactionSummaryResponse>(
      "/transactions/summary",
      {
        params: filters,
      }
    );
    return response.data;
  },

  async getMonthlyStats(params: { month: string }): Promise<TransactionStatsMonthly> {
    const response = await apiClient.get<TransactionStatsMonthly>(
      "/transactions/stats/monthly",
      { params }
    );
    return response.data;
  },

  async getCategoryTransactionStats(
    categoryId: string,
    params: { startDate: string; endDate: string }
  ): Promise<any> {
    const response = await apiClient.get(
      `/transactions/stats/category/${categoryId}`,
      { params }
    );
    return response.data;
  }
};
