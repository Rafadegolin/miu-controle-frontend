import { apiClient } from "./api-client";
import type { DashboardHomeResponse } from "@/types/api";

export const reportsActions = {
  async getDashboardReport(filters: {
    startDate: string;
    endDate: string;
  }): Promise<any> {
    const response = await apiClient.get("/reports/dashboard", {
      params: filters,
    });
    return response.data;
  },

  async getCategoryAnalysis(filters: {
    startDate: string;
    endDate: string;
  }): Promise<any> {
    const response = await apiClient.get("/reports/category-analysis", {
      params: filters,
    });
    return response.data;
  },

  async getMonthlyTrend(filters: {
    startDate: string;
    endDate: string;
  }): Promise<any> {
    const response = await apiClient.get("/reports/monthly-trend", {
      params: filters,
    });
    return response.data;
  },

  async getAccountAnalysis(filters: {
    startDate: string;
    endDate: string;
  }): Promise<any> {
    const response = await apiClient.get("/reports/account-analysis", {
      params: filters,
    });
    return response.data;
  },

  async getTopTransactions(filters: {
    startDate: string;
    endDate: string;
  }): Promise<any> {
    const response = await apiClient.get("/reports/top-transactions", {
      params: filters,
    });
    return response.data;
  },

  async getInsights(filters: {
    startDate: string;
    endDate: string;
  }): Promise<any> {
    const response = await apiClient.get("/reports/insights", {
      params: filters,
    });
    return response.data;
  },

  async getFullReport(filters: {
    startDate: string;
    endDate: string;
  }): Promise<any> {
    const response = await apiClient.get("/reports/full-report", {
      params: filters,
    });
    return response.data;
  },

  async getDashboardHome(): Promise<DashboardHomeResponse> {
    const response = await apiClient.get<DashboardHomeResponse>("/dashboard/home");
    return response.data;
  }
};
