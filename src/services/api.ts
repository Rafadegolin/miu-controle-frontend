import axios, { AxiosError, AxiosInstance } from "axios";
import type {
  AuthResponse,
  LoginDto,
  RegisterDto,
  User,
  Account,
  CreateAccountDto,
  AccountSummaryResponse,
  Category,
  CategoryStats,
  CreateCategoryDto,
  Transaction,
  CreateTransactionDto,
  PaginatedResponse,
  TransactionFilters,
  TransactionSummaryResponse,
  TransactionStatsMonthly,
  Goal,
  CreateGoalDto,
  AddPurchaseLinkDto,
  ContributeGoalDto,
  GoalSummaryResponse,
  PurchaseLinksSummaryResponse,
  Budget,
  CreateBudgetDto,
  BudgetStatusResponse,
  RecurringTransaction,
  CreateRecurringTransactionDto,
  DashboardHomeResponse,
  Session,
} from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// DEBUG: Verificar qual URL está sendo usada
console.log("🔍 API_BASE_URL:", API_BASE_URL);
console.log("🔍 process.env.NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Interceptor para adicionar token automaticamente
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor para refresh token automático
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = this.getRefreshToken();
            if (!refreshToken) {
              this.logout();
              return Promise.reject(error);
            }

            const response = await axios.post<AuthResponse>(
              `${API_BASE_URL}/auth/refresh`,
              { refreshToken }
            );

            const { accessToken, refreshToken: newRefreshToken } =
              response.data;
            this.setTokens(accessToken, newRefreshToken);

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return this.api(originalRequest);
          } catch (refreshError) {
            this.logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

  }

  // ============================================
  // GENERIC HTTP METHODS
  // ============================================

  public async get<T>(url: string, config?: any): Promise<T> {
    const response = await this.api.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.api.post<T>(url, data, config);
    return response.data;
  }

  public async patch<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.api.patch<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: any): Promise<T> {
    const response = await this.api.delete<T>(url, config);
    return response.data;
  }

  // ============================================
  // TOKEN MANAGEMENT
  // ============================================

  private getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("accessToken");
  }

  private getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("refreshToken");
  }

  private setTokens(accessToken: string, refreshToken: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  private clearTokens() {
    if (typeof window === "undefined") return;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  // ============================================
  // AUTH
  // ============================================

  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>("/auth/register", data);
    this.setTokens(response.data.accessToken, response.data.refreshToken);
    return response.data;
  }

  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>("/auth/login", data);
    this.setTokens(response.data.accessToken, response.data.refreshToken);
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await this.api.post("/auth/logout");
    } finally {
      this.clearTokens();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  }

  async getSessions(): Promise<Session[]> {
    const response = await this.api.get<Session[]>("/auth/sessions");
    return response.data;
  }

  async revokeSession(id: string): Promise<{ message: string }> {
    const response = await this.api.delete(`/auth/sessions/${id}`);
    return response.data;
  }

  async revokeAllSessions(): Promise<{ message: string }> {
    const response = await this.api.delete("/auth/sessions/revoke-all");
    return response.data;
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await this.api.post("/auth/forgot-password", { email });
    return response.data;
  }

  async verifyResetToken(token: string): Promise<{ valid: boolean }> {
    const response = await this.api.post("/auth/verify-reset-token", { token });
    return response.data;
  }

  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<{ message: string }> {
    const response = await this.api.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  }

  // ============================================
  // RELATÓRIOS
  // ============================================

  async getDashboardReport(filters: {
    startDate: string;
    endDate: string;
  }): Promise<any> {
    const response = await this.api.get("/reports/dashboard", {
      params: filters,
    });
    return response.data;
  }

  async getCategoryAnalysis(filters: {
    startDate: string;
    endDate: string;
  }): Promise<any> {
    const response = await this.api.get("/reports/category-analysis", {
      params: filters,
    });
    return response.data;
  }

  async getMonthlyTrend(filters: {
    startDate: string;
    endDate: string;
  }): Promise<any> {
    const response = await this.api.get("/reports/monthly-trend", {
      params: filters,
    });
    return response.data;
  }

  async getAccountAnalysis(filters: {
    startDate: string;
    endDate: string;
  }): Promise<any> {
    const response = await this.api.get("/reports/account-analysis", {
      params: filters,
    });
    return response.data;
  }

  async getTopTransactions(filters: {
    startDate: string;
    endDate: string;
  }): Promise<any> {
    const response = await this.api.get("/reports/top-transactions", {
      params: filters,
    });
    return response.data;
  }

  async getInsights(filters: {
    startDate: string;
    endDate: string;
  }): Promise<any> {
    const response = await this.api.get("/reports/insights", {
      params: filters,
    });
    return response.data;
  }

  async getFullReport(filters: {
    startDate: string;
    endDate: string;
  }): Promise<any> {
    const response = await this.api.get("/reports/full-report", {
      params: filters,
    });
    return response.data;
  }

  async getDashboardHome(): Promise<DashboardHomeResponse> {
    const response = await this.api.get<DashboardHomeResponse>("/dashboard/home");
    return response.data;
  }

  // ============================================
  // NOTIFICAÇÕES (MÉTODOS NOVOS)
  // ============================================

  // ============================================
  // USER
  // ============================================

  async getCurrentUser(): Promise<User> {
    const response = await this.api.get<User>("/users/me");
    return response.data;
  }

  async updateCurrentUser(data: Partial<User>): Promise<User> {
    const response = await this.api.patch<User>("/users/me", data);
    return response.data;
  }

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await this.api.post("/users/me/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }

  async deleteAvatar(): Promise<{ message: string }> {
    const response = await this.api.delete("/users/me/avatar");
    return response.data;
  }

  async changePassword(data: any): Promise<{ message: string }> {
    const response = await this.api.patch("/users/me/password", data);
    return response.data;
  }

  async deleteMyAccount(): Promise<{ message: string }> {
    const response = await this.api.delete("/users/me");
    return response.data;
  }

  // ============================================
  // ACCOUNTS
  // ============================================

  async getAccounts(activeOnly?: boolean): Promise<Account[]> {
    const response = await this.api.get<Account[]>("/accounts", {
      params: { activeOnly },
    });
    return response.data;
  }

  async getAccount(id: string): Promise<Account> {
    const response = await this.api.get<Account>(`/accounts/${id}`);
    return response.data;
  }

  async createAccount(data: CreateAccountDto): Promise<Account> {
    const response = await this.api.post<Account>("/accounts", data);
    return response.data;
  }

  async updateAccount(
    id: string,
    data: Partial<CreateAccountDto>
  ): Promise<Account> {
    const response = await this.api.patch<Account>(`/accounts/${id}`, data);
    return response.data;
  }

  async deleteAccount(id: string): Promise<{ message: string }> {
    const response = await this.api.delete(`/accounts/${id}`);
    return response.data;
  }

  async getAccountsSummary(): Promise<AccountSummaryResponse> {
    const response = await this.api.get<AccountSummaryResponse>(
      "/accounts/balance"
    );
    return response.data;
  }

  // ============================================
  // CATEGORIES
  // ============================================

  async getCategories(type?: string): Promise<Category[]> {
    const response = await this.api.get<Category[]>("/categories", {
      params: { type },
    });
    return response.data;
  }

  async getCategoriesTree(): Promise<Category[]> {
    const response = await this.api.get<Category[]>("/categories/tree");
    return response.data;
  }

  async createCategory(data: CreateCategoryDto): Promise<Category> {
    const response = await this.api.post<Category>("/categories", data);
    return response.data;
  }

  async updateCategory(
    id: string,
    data: Partial<CreateCategoryDto>
  ): Promise<Category> {
    const response = await this.api.patch<Category>(`/categories/${id}`, data);
    return response.data;
  }

  async deleteCategory(id: string): Promise<{ message: string }> {
    const response = await this.api.delete(`/categories/${id}`);
    return response.data;
  }

  async getCategoryStats(
    id: string,
    params?: { startDate?: string; endDate?: string }
  ): Promise<CategoryStats> {
    const response = await this.api.get<CategoryStats>(
      `/categories/${id}/stats`,
      { params }
    );
    return response.data;
  }

  // ============================================
  // TRANSACTIONS
  // ============================================

  async getTransactions(
    filters?: TransactionFilters
  ): Promise<Transaction[]> {
    const response = await this.api.get<Transaction[]>(
      "/transactions",
      {
        params: filters,
      }
    );
    return response.data;
  }

  async getTransaction(id: string): Promise<Transaction> {
    const response = await this.api.get<Transaction>(`/transactions/${id}`);
    return response.data;
  }

  async createTransaction(data: CreateTransactionDto): Promise<Transaction> {
    const response = await this.api.post<Transaction>("/transactions", data);
    return response.data;
  }

  async updateTransaction(
    id: string,
    data: Partial<CreateTransactionDto>
  ): Promise<Transaction> {
    const response = await this.api.patch<Transaction>(
      `/transactions/${id}`,
      data
    );
    return response.data;
  }

  async deleteTransaction(id: string): Promise<{ message: string }> {
    const response = await this.api.delete(`/transactions/${id}`);
    return response.data;
  }

  async uploadReceipt(id: string, file: File): Promise<{ receiptUrl: string }> {
    const formData = new FormData();
    formData.append("receipt", file);
    const response = await this.api.post(
      `/transactions/${id}/receipt`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  }

  async deleteReceipt(id: string): Promise<{ message: string }> {
    const response = await this.api.delete(`/transactions/${id}/receipt`);
    return response.data;
  }

  async getTransactionsSummary(filters?: {
    startDate?: string;
    endDate?: string;
    accountId?: string;
  }): Promise<TransactionSummaryResponse> {
    const response = await this.api.get<TransactionSummaryResponse>(
      "/transactions/summary",
      {
        params: filters,
      }
    );
    return response.data;
  }

  async getMonthlyStats(params: { month: string }): Promise<TransactionStatsMonthly> {
    const response = await this.api.get<TransactionStatsMonthly>(
      "/transactions/stats/monthly",
      { params }
    );
    return response.data;
  }

  async getCategoryTransactionStats(
    categoryId: string,
    params: { startDate: string; endDate: string }
  ): Promise<any> {
    const response = await this.api.get(
      `/transactions/stats/category/${categoryId}`,
      { params }
    );
    return response.data;
  }

  // ============================================
  // GOALS (COM IMAGENS E LINKS!)
  // ============================================

  async getGoals(status?: string): Promise<Goal[]> {
    const response = await this.api.get<Goal[]>("/goals", {
      params: { status },
    });
    return response.data;
  }

  async getGoal(id: string): Promise<Goal> {
    const response = await this.api.get<Goal>(`/goals/${id}`);
    return response.data;
  }

  async createGoal(data: CreateGoalDto): Promise<Goal> {
    const response = await this.api.post<Goal>("/goals", data);
    return response.data;
  }

  async updateGoal(id: string, data: Partial<CreateGoalDto>): Promise<Goal> {
    const response = await this.api.patch<Goal>(`/goals/${id}`, data);
    return response.data;
  }

  async deleteGoal(id: string): Promise<{ message: string }> {
    const response = await this.api.delete(`/goals/${id}`);
    return response.data;
  }

  async contributeToGoal(
    id: string,
    data: ContributeGoalDto
  ): Promise<{ contribution: any; goal: Goal }> {
    const response = await this.api.post(`/goals/${id}/contribute`, data);
    return response.data;
  }

  async withdrawFromGoal(
    id: string,
    amount: number
  ): Promise<{ contribution: any; goal: Goal }> {
    const response = await this.api.post(`/goals/${id}/withdraw`, { amount });
    return response.data;
  }

  async getGoalsSummary(): Promise<GoalSummaryResponse> {
    const response = await this.api.get<GoalSummaryResponse>("/goals/summary");
    return response.data;
  }

  // 🆕 IMAGEM DA META
  async uploadGoalImage(
    id: string,
    file: File
  ): Promise<{ message: string; goal: Goal }> {
    const formData = new FormData();
    formData.append("image", file);
    const response = await this.api.post(`/goals/${id}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }

  async deleteGoalImage(id: string): Promise<{ message: string; goal: Goal }> {
    const response = await this.api.delete(`/goals/${id}/image`);
    return response.data;
  }

  // 🆕 LINKS DE COMPRA
  async addPurchaseLink(
    goalId: string,
    data: AddPurchaseLinkDto
  ): Promise<{ message: string; goal: Goal }> {
    const response = await this.api.post(
      `/goals/${goalId}/purchase-links`,
      data
    );
    return response.data;
  }

  async updatePurchaseLink(
    goalId: string,
    linkId: string,
    data: Partial<AddPurchaseLinkDto>
  ): Promise<{ message: string; goal: Goal }> {
    const response = await this.api.patch(
      `/goals/${goalId}/purchase-links/${linkId}`,
      data
    );
    return response.data;
  }

  async deletePurchaseLink(
    goalId: string,
    linkId: string
  ): Promise<{ message: string; goal: Goal }> {
    const response = await this.api.delete(
      `/goals/${goalId}/purchase-links/${linkId}`
    );
    return response.data;
  }

  async getPurchaseLinksSummary(
    goalId: string
  ): Promise<PurchaseLinksSummaryResponse> {
    const response = await this.api.get<PurchaseLinksSummaryResponse>(
      `/goals/${goalId}/purchase-links/summary`
    );
    return response.data;
  }

  // ============================================
  // BUDGETS
  // ============================================

  async getBudgets(period?: string): Promise<Budget[]> {
    const response = await this.api.get<Budget[]>("/budgets", {
      params: { period },
    });
    return response.data;
  }

  async createBudget(data: CreateBudgetDto): Promise<Budget> {
    const response = await this.api.post<Budget>("/budgets", data);
    return response.data;
  }

  async updateBudget(
    id: string,
    data: Partial<CreateBudgetDto>
  ): Promise<Budget> {
    const response = await this.api.patch<Budget>(`/budgets/${id}`, data);
    return response.data;
  }

  async deleteBudget(id: string): Promise<{ message: string }> {
    const response = await this.api.delete(`/budgets/${id}`);
    return response.data;
  }

  async getBudgetStatus(id: string): Promise<BudgetStatusResponse> {
    const response = await this.api.get<BudgetStatusResponse>(
      `/budgets/${id}/status`
    );
    return response.data;
  }

  // ============================================
  // RECURRING TRANSACTIONS
  // ============================================

  async getRecurringTransactions(
    isActive?: boolean
  ): Promise<RecurringTransaction[]> {
    const response = await this.api.get<RecurringTransaction[]>(
      "/recurring-transactions",
      {
        params: { isActive },
      }
    );
    return response.data;
  }

  async createRecurringTransaction(
    data: CreateRecurringTransactionDto
  ): Promise<RecurringTransaction> {
    const response = await this.api.post<RecurringTransaction>(
      "/recurring-transactions",
      data
    );
    return response.data;
  }

  async updateRecurringTransaction(
    id: string,
    data: Partial<CreateRecurringTransactionDto>
  ): Promise<RecurringTransaction> {
    const response = await this.api.patch<RecurringTransaction>(
      `/recurring-transactions/${id}`,
      data
    );
    return response.data;
  }

  async deleteRecurringTransaction(id: string): Promise<{ message: string }> {
    const response = await this.api.delete(`/recurring-transactions/${id}`);
    return response.data;
  }

  async toggleRecurringTransaction(id: string): Promise<RecurringTransaction> {
    const response = await this.api.patch<RecurringTransaction>(
      `/recurring-transactions/${id}/toggle`
    );
    return response.data;
  }
}

// Singleton instance
export const api = new ApiService();
export default api;
