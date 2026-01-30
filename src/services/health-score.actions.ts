"use server";

import { api } from "./api";
import { FinancialHealthResponse } from "@/types/api";

export async function getHealthScore(): Promise<FinancialHealthResponse> {
  // In a real scenario, this would call the backend:
  // return api.get<FinancialHealthResponse>("/health-score");

  // Mocking data for development/demonstration until backend is ready
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        score: 720,
        level: "GOOD" as any,
        pilars: {
          consistency: {
            score: 280,
            maxScore: 300,
            label: "Consistência",
            color: "#32d6a5", // Neon Green
            icon: "CalendarCheck",
            percentage: 93,
          },
          budget: {
            score: 200,
            maxScore: 250,
            label: "Orçamento",
            color: "#3b82f6", // Blue
            icon: "PieChart",
            percentage: 80,
          },
          goals: {
            score: 100,
            maxScore: 200,
            label: "Metas",
            color: "#a855f7", // Purple
            icon: "Target",
            percentage: 50,
          },
          emergencyFund: {
            score: 75,
            maxScore: 150,
            label: "Reserva",
            color: "#f59e0b", // Amber
            icon: "ShieldAlert",
            percentage: 50,
          },
          diversification: {
            score: 65,
            maxScore: 100,
            label: "Diversificação",
            color: "#ec4899", // Pink
            icon: "Layers",
            percentage: 65,
          },
        },
        history: generateMockHistory(),
        insight: {
          message:
            "Sua consistência está excelente, parabéns! O ponto de atenção é sua Reserva de Emergência, que cobre menos de 3 meses dos seus custos fixos.",
          generatedAt: new Date().toISOString(),
          actionItem: "Tente destinar 10% da sua renda extra para a Reserva este mês.",
        },
      });
    }, 800);
  });
}

function generateMockHistory() {
  const history = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    history.push({
      date: date.toISOString().split("T")[0],
      score: 650 + Math.floor(Math.random() * 100) + (i * 2), // Slight upward trend
    });
  }
  return history;
}

export async function refreshInsights(): Promise<string> {
  // Mock call to refresh AI
  return new Promise((resolve) => {
    setTimeout(() => {
        resolve("Corte gastos com 'Lazer' para acelerar sua meta 'Viagem'.");
    }, 2000);
  });
}


