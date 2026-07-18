import { apiClient } from "@/services/api-client";
import { SimulationRequest, SimulationResult } from "@/types/scenarios";

interface ScenarioResultDto {
  isViable: boolean;
  currentBalance: number;
  projectedBalance12Months: number[];
  lowestBalance: number;
  impactedGoals: string[];
  recommendations: { type: string; message: string }[];
}

// ScenarioType do front (EMERGENCY) → enum do backend (EMERGENCY_EXPENSE).
const TYPE_MAP: Record<string, string> = {
  BIG_PURCHASE: "BIG_PURCHASE",
  INCOME_LOSS: "INCOME_LOSS",
  NEW_RECURRING: "NEW_RECURRING",
  EMERGENCY: "EMERGENCY_EXPENSE",
};

export async function simulateScenario(
  data: SimulationRequest,
): Promise<SimulationResult> {
  const res = await apiClient.post<ScenarioResultDto>("/scenarios/simulate", {
    type: TYPE_MAP[data.type] ?? data.type,
    amount: data.amount,
    installments: data.installments,
    description: data.description,
    // startDate é obrigatório no backend; default hoje se o form não enviar.
    startDate: data.startDate ?? new Date().toISOString().split("T")[0],
  });
  const r = res.data;

  return {
    isViable: r.isViable,
    lowestBalance: r.lowestBalance,
    projectedBalance12Months: r.projectedBalance12Months,
    // baseline = saldo atual mantido constante (o backend não devolve baseline).
    baselineProjection: r.projectedBalance12Months.map(() => r.currentBalance),
    recommendations: (r.recommendations ?? []).map((rec) => rec.message),
    currentBalance: r.currentBalance,
    impactedGoals: r.impactedGoals,
  };
}
