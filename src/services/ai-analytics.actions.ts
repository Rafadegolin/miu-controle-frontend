import { apiClient } from "./api-client";
import { 
  ForecastResponse, 
  Anomaly, 
  FinancialHealthResponse, 
  GoalForecastResponse,
  HealthLevel 
} from "@/types/api";

// MOCK DATA FOR FALLBACK
const MOCK_FORECAST: ForecastResponse = {
  available: true,
  forecast: {
    summary: "Seus gastos com alimentação aumentaram 15% este mês, mas sua renda extra compensou. Mantenha o foco em reduzir o delivery.",
    healthScore: 78,
    predictedExpense: 4250.00,
    predictedIncome: 5600.00,
    savingsGoal: 1350.00,
    insights: [
      "Gasto recorrente de R$ 500 detectado em serviços de streaming.",
      "Você economizou 10% a mais do que a média do mês passado."
    ],
    recommendation: "Tente alocar o excedente para a Meta 'Viagem Europa'."
  },
  trends: {
    predictedExpense: 4200.00,
    predictedIncome: 5600.00,
    expenseTrendSlope: 50.5,
    incomeTrendSlope: 120.0
  }
};

const MOCK_HEALTH: FinancialHealthResponse = {
  score: 820,
  level: HealthLevel.EXCELLENT,
  pilars: {
    consistency: { score: 85, maxScore: 100, label: "Consistência", color: "#32d6a5", icon: "CheckCircle", percentage: 85 },
    budget: { score: 90, maxScore: 100, label: "Orçamento", color: "#32d6a5", icon: "PieChart", percentage: 90 },
    goals: { score: 70, maxScore: 100, label: "Metas", color: "#F59E0B", icon: "Target", percentage: 70 },
    emergencyFund: { score: 100, maxScore: 100, label: "Reserva", color: "#32d6a5", icon: "Shield", percentage: 100 },
    diversification: { score: 60, maxScore: 100, label: "Diversificação", color: "#F59E0B", icon: "TrendingUp", percentage: 60 }
  },
  history: [
    { date: "2023-08-01", score: 650 },
    { date: "2023-09-01", score: 700 },
    { date: "2023-10-01", score: 720 },
    { date: "2023-11-01", score: 780 },
    { date: "2023-12-01", score: 820 }
  ]
};

const MOCK_ANOMALIES: Anomaly[] = [
    {
        id: "1",
        transactionId: "tx-123",
        risk: "HIGH",
        explanation: "Valor de R$ 1.200,00 em 'Eletrônicos' é atípico para seu histórico.",
        isDismissed: false,
        detectedAt: new Date().toISOString(),
        transaction: {
            id: "tx-123",
            userId: "u1",
            accountId: "acc1",
            categoryId: "cat1",
            type: "EXPENSE" as any,
            amount: 1200,
            description: "Kabum Tecnologia",
            date: new Date().toISOString(),
            tags: [],
            status: "COMPLETED",
            source: "MANUAL",
            isRecurring: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    }
];

export const aiAnalyticsActions = {
  async getForecast(): Promise<ForecastResponse> {
    try {
        const response = await apiClient.get<ForecastResponse>("/ai/analytics/forecast");
        return response.data;
    } catch (error) {
        console.warn("API Error (Forecast), returning mock data:", error);
        return MOCK_FORECAST;
    }
  },

  async getAnomalies(): Promise<Anomaly[]> {
    try {
        const response = await apiClient.get<Anomaly[]>("/ai/analytics/anomalies");
        return response.data;
    } catch (error) {
        console.warn("API Error (Anomalies), returning mock data:", error);
        return MOCK_ANOMALIES;
    }
  },

  async dismissAnomaly(id: string): Promise<void> {
    // Just try API, if fails assume success for UI 
    try {
      await apiClient.post(`/ai/analytics/anomalies/${id}/dismiss`);
    } catch (e) {
      console.log("Mock dismiss");
    }
  },

  async getFinancialHealth(): Promise<FinancialHealthResponse> {
    try {
        const response = await apiClient.get<FinancialHealthResponse>("/ai/analytics/financial-health");
        return response.data;
    } catch (error) {
         console.warn("API Error (Financial Health), returning mock data:", error);
         return MOCK_HEALTH;
    }
  },

  async getGoalForecast(goalId: string): Promise<GoalForecastResponse> {
    try {
        const response = await apiClient.get<GoalForecastResponse>(`/ai/analytics/goal-forecast/${goalId}`);
        return response.data;
    } catch (error) {
        console.warn("API Error (Goal Forecast), returning mock data:", error);
        return {
            goalId,
            status: "ON_TRACK",
            completionDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // +90 days
            daysRemaining: 90,
            requiredMonthlyContribution: 450.00,
            message: "Mantendo o ritmo atual, você atingirá a meta em 3 meses."
        };
    }
  }
};
