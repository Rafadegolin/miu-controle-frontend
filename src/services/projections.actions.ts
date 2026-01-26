import { apiClient } from "./api-client";
import type { ProjectionMonth } from "@/types/api";

export const projectionsActions = {
  // Get cash flow projections for X months
  async getCashFlow(months: number = 6): Promise<ProjectionMonth[]> {
    const response = await apiClient.get<ProjectionMonth[]>("/projections/cash-flow", {
      params: { months },
    });
    return response.data;
  },
};
