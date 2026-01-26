import { apiClient } from "./api-client";
import type { 
  DashboardHomeResponse,
  ReportDashboardResponse,
  CategoryAnalysisResponse,
  MonthlyTrendResponse,
  AccountAnalysisResponse,
  TopTransactionsResponse,
  DashboardInsight,
  FullReportResponse
} from "@/types/api";

export const reportsActions = {
  async getDashboardReport(filters: {
    startDate: string;
    endDate: string;
  }): Promise<ReportDashboardResponse> {
    const response = await apiClient.get<ReportDashboardResponse>("/reports/dashboard", {
      params: filters,
    });
    return response.data;
  },

  async getCategoryAnalysis(filters: {
    startDate: string;
    endDate: string;
  }): Promise<CategoryAnalysisResponse> {
    const response = await apiClient.get<CategoryAnalysisResponse>("/reports/category-analysis", {
      params: filters,
    });
    return response.data;
  },

  async getMonthlyTrend(filters: {
    startDate: string;
    endDate: string;
  }): Promise<MonthlyTrendResponse> {
    const response = await apiClient.get<MonthlyTrendResponse>("/reports/monthly-trend", {
      params: filters,
    });
    return response.data;
  },

  async getAccountAnalysis(filters: {
    startDate: string;
    endDate: string;
  }): Promise<AccountAnalysisResponse> {
    const response = await apiClient.get<AccountAnalysisResponse>("/reports/account-analysis", {
      params: filters,
    });
    return response.data;
  },

  async getTopTransactions(filters: {
    startDate: string;
    endDate: string;
  }): Promise<TopTransactionsResponse> {
    const response = await apiClient.get<TopTransactionsResponse>("/reports/top-transactions", {
      params: filters,
    });
    return response.data;
  },

  async getInsights(filters: {
    startDate: string;
    endDate: string;
  }): Promise<DashboardInsight[]> {
    const response = await apiClient.get<DashboardInsight[]>("/reports/insights", {
      params: filters,
    });
    return response.data;
  },

  async getFullReport(filters: {
    startDate: string;
    endDate: string;
  }): Promise<FullReportResponse> {
    const response = await apiClient.get<FullReportResponse>("/reports/full-report", {
      params: filters,
    });
    return response.data;
  },

  async getDashboardHome(): Promise<DashboardHomeResponse> {
    const response = await apiClient.get<DashboardHomeResponse>("/dashboard/home");
    return response.data;
  }
};
