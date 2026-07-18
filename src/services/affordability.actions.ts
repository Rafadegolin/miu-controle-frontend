import { apiClient } from "./api-client";
import { SimulationRequest, SimulationResult } from "@/types/scenarios";

interface AffordabilityResultDto {
  score: number; // 0–100
  status: "CAN_AFFORD" | "CAUTION" | "NOT_RECOMMENDED";
  badgeColor: string;
  breakdown: {
    balanceScore: number;
    budgetScore: number;
    reserveScore: number;
    goalScore: number;
    historyScore: number;
    timingScore: number;
  };
  recommendations: string[];
}

export const affordabilityActions = {
  // POST /scenarios/affordability (antigo /affordability/check, sem `alternatives`)
  async checkAffordability(data: SimulationRequest): Promise<SimulationResult> {
    const res = await apiClient.post<AffordabilityResultDto>(
      "/scenarios/affordability",
      {
        amount: data.amount,
        categoryId: data.categoryId,
        installments: data.installments,
      },
    );
    const r = res.data;
    return {
      isViable: r.status !== "NOT_RECOMMENDED",
      score: r.score,
      status: r.status,
      badgeColor: r.badgeColor,
      dimensions: {
        balanceScore: r.breakdown.balanceScore,
        budgetScore: r.breakdown.budgetScore,
        reserveScore: r.breakdown.reserveScore,
        impactScore: r.breakdown.goalScore,
        historyScore: r.breakdown.historyScore,
        timingScore: r.breakdown.timingScore,
      },
      recommendations: r.recommendations,
      lowestBalance: 0,
      projectedBalance12Months: [],
      baselineProjection: [],
    };
  },
};
