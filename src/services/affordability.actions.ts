import { SimulationRequest, SimulationResult } from "@/types/scenarios";

export const affordabilityActions = {
  
  // Mock logic mirroring backend document
  async checkAffordability(data: SimulationRequest): Promise<SimulationResult> {
      return new Promise((resolve) => {
          setTimeout(() => {
              const amount = data.amount || 0;
              let score = 0;
              let recommendations: string[] = [];
              let dimensions = {
                  balanceScore: 0,
                  budgetScore: 0,
                  reserveScore: 0,
                  impactScore: 0,
                  historyScore: 0,
                  timingScore: 0,
              };

              // 1. Balance Score (25 pts) - Mock: Assume user has 2000 available
              const availableBalance = 2000;
              if (amount <= availableBalance) {
                  dimensions.balanceScore = 25;
              } else {
                  dimensions.balanceScore = 5;
                  recommendations.push("Saldo atual insuficiente para compra à vista.");
              }
              score += dimensions.balanceScore;

              // 2. Budget Score (20 pts) - Mock
              if (amount < 300) {
                  dimensions.budgetScore = 20;
              } else {
                  dimensions.budgetScore = 10;
                  recommendations.push("Essa compra consome mais de 50% do orçamento da categoria.");
              }
              score += dimensions.budgetScore;

              // 3. Reserve Score (20 pts)
              if (availableBalance - amount > 1000) {
                  dimensions.reserveScore = 20;
              } else {
                  dimensions.reserveScore = 5;
                  recommendations.push("Sua reserva de segurança ficará abaixo do ideal.");
              }
              score += dimensions.reserveScore;

              // 4. Impact Score (15 pts) - Mock
              dimensions.impactScore = 15; // Assume no negative impact on goals
              score += dimensions.impactScore;

              // 5. History Score (10 pts)
              dimensions.historyScore = 10;
              score += dimensions.historyScore;

              // 6. Timing Score (10 pts)
              const today = new Date().getDate();
              if (today < 20) {
                  dimensions.timingScore = 10;
              } else {
                  dimensions.timingScore = 5;
                  recommendations.push("Fim de mês: considere esperar o próximo salário.");
              }
              score += dimensions.timingScore;

              // Determine Status
              let status: "CAN_AFFORD" | "CAUTION" | "NOT_RECOMMENDED" = "NOT_RECOMMENDED";
              let badgeColor = "#EF4444"; // Red

              if (score >= 70) {
                  status = "CAN_AFFORD";
                  badgeColor = "#32d6a5"; // Green
                  recommendations.push("Compra segura. Aproveite!");
              } else if (score >= 40) {
                  status = "CAUTION";
                  badgeColor = "#F59E0B"; // Yellow
              }

              resolve({
                  isViable: score >= 40,
                  recommendations: recommendations,
                  score,
                  status,
                  badgeColor,
                  dimensions,
                  lowestBalance: 0,
                  projectedBalance12Months: [],
                  baselineProjection: []
              });

          }, 1000);
      });
  }
};
