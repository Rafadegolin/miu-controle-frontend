import { apiClient } from "./api-client";
import type { Account, CreateAccountDto, AccountSummaryResponse } from "@/types/api";

export const accountsActions = {
  async getAccounts(activeOnly?: boolean): Promise<Account[]> {
    const response = await apiClient.get<Account[]>("/accounts", {
      params: { activeOnly },
    });
    return response.data;
  },

  async getAccount(id: string): Promise<Account> {
    const response = await apiClient.get<Account>(`/accounts/${id}`);
    return response.data;
  },

  async createAccount(data: CreateAccountDto): Promise<Account> {
    const response = await apiClient.post<Account>("/accounts", data);
    return response.data;
  },

  async updateAccount(
    id: string,
    data: Partial<CreateAccountDto>
  ): Promise<Account> {
    const response = await apiClient.patch<Account>(`/accounts/${id}`, data);
    return response.data;
  },

  async deleteAccount(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete(`/accounts/${id}`);
    return response.data;
  },

  async getAccountsSummary(): Promise<AccountSummaryResponse> {
    const response = await apiClient.get<AccountSummaryResponse>(
      "/accounts/balance"
    );
    return response.data;
  }
};
