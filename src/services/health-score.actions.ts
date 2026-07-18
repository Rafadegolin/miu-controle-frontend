import { apiClient } from "./api-client";
import { FinancialHealthResponse, HealthPilar, HealthScore } from "@/types/api";

// Metadados visuais dos 5 pilares (o backend só devolve os sub-scores numéricos).
const PILAR_META = {
  consistency: { label: "Consistência", color: "#32d6a5", icon: "CalendarCheck", max: 300 },
  budget: { label: "Orçamento", color: "#3b82f6", icon: "PieChart", max: 250 },
  goals: { label: "Metas", color: "#a855f7", icon: "Target", max: 200 },
  emergencyFund: { label: "Reserva", color: "#f59e0b", icon: "ShieldAlert", max: 150 },
  diversification: { label: "Diversificação", color: "#ec4899", icon: "Layers", max: 100 },
} as const;

function buildPilar(
  score: number,
  meta: { label: string; color: string; icon: string; max: number },
): HealthPilar {
  return {
    score,
    maxScore: meta.max,
    label: meta.label,
    color: meta.color,
    icon: meta.icon,
    percentage: meta.max > 0 ? Math.round((score / meta.max) * 100) : 0,
  };
}

/**
 * GET /health-score → adapta o registro HealthScore (totalScore + sub-scores
 * planos) para o shape FinancialHealthResponse consumido pela UI.
 * O backend não expõe histórico neste endpoint (history fica vazio).
 */
export async function getHealthScore(): Promise<FinancialHealthResponse> {
  const res = await apiClient.get<HealthScore>("/health-score");
  const h = res.data;

  return {
    score: h.totalScore,
    level: h.level,
    pilars: {
      consistency: buildPilar(h.consistencyScore, PILAR_META.consistency),
      budget: buildPilar(h.budgetScore, PILAR_META.budget),
      goals: buildPilar(h.goalsScore, PILAR_META.goals),
      emergencyFund: buildPilar(h.emergencyScore, PILAR_META.emergencyFund),
      diversification: buildPilar(h.diversityScore, PILAR_META.diversification),
    },
    history: [],
    insight: h.aiInsights
      ? {
          message: h.aiInsights,
          generatedAt: h.lastAiAnalysisAt ?? h.updatedAt,
        }
      : undefined,
  };
}

export async function refreshInsights(): Promise<string> {
  const res = await apiClient.post<{ insight?: string; message?: string } | null>(
    "/health-score/refresh-insights",
  );
  return res.data?.insight ?? res.data?.message ?? "";
}
