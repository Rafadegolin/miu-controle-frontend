import { apiClient } from "./api-client";
import type { InflationImpact, InflationParams, InflationScenario } from "@/types/inflation";

export const inflationActions = {
  async calculateImpact(params: InflationParams): Promise<InflationImpact> {
    const response = await apiClient.post<InflationImpact>(
      "/simulations/inflation/impact",
      params
    );
    return response.data;
  },

  async getScenarios(): Promise<InflationScenario[]> {
    const response = await apiClient.get<InflationScenario[]>(
      "/simulations/inflation/scenarios"
    );
    return response.data;
  },
};
