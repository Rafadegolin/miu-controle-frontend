"use server";

import { MonthlyReport, AnalysisInsight, AnalysisAnomaly } from "@/types/api";

// Mock Data Generators

function generateInsights(expenseChange: number, savingsRate: number): AnalysisInsight[] {
  const insights: AnalysisInsight[] = [];

  if (expenseChange > 10) {
    insights.push({
      id: "1",
      type: "NEGATIVE",
      relatedMetric: "EXPENSE",
      message: `Despesas subiram ${expenseChange.toFixed(0)}%`,
      explanation: "Identificamos um aumento atípico em gastos com Lazer e Restaurantes neste mês comparado à sia média.",
      actionItem: "Considere definir um limite semanal para saídas.",
    });
  } else if (expenseChange < -5) {
    insights.push({
      id: "1",
      type: "POSITIVE",
      relatedMetric: "EXPENSE",
      message: "Ótimo controle de gastos!",
      explanation: "Você conseguiu reduzir suas despesas fixas em relação ao mês anterior.",
    });
  }

  if (savingsRate < 10) {
    insights.push({
      id: "2",
      type: "WARNING",
      relatedMetric: "SAVINGS_RATE",
      message: "Taxa de poupança baixa",
      explanation: `Sua taxa de poupança foi de apenas ${savingsRate.toFixed(1)}%. O ideal é manter acima de 20%.`,
      actionItem: "Revise assinaturas não utilizadas.",
    });
  } else {
    insights.push({
      id: "2",
      type: "POSITIVE",
      relatedMetric: "SAVINGS_RATE",
      message: "Poupança saudável",
      explanation: "Você está guardando uma parcela excelente da sua renda.",
    });
  }

  return insights;
}

export async function getMonthlyReport(month: string = "2024-03"): Promise<MonthlyReport> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock random variations for demo purposes
      const income = 8500;
      const expense = 4200 + Math.random() * 2000;
      const balance = income - expense;
      const savingsRate = (balance / income) * 100;
      
      const expenseChange = ((Math.random() * 40) - 20); // -20% to +20%

      resolve({
        month,
        stats: {
          income,
          expense,
          balance,
          savingsRate,
        },
        comparison: {
          incomeChange: 2.5,
          expenseChange,
          savingsRateChange: expenseChange * -0.5,
        },
        insights: generateInsights(expenseChange, savingsRate),
        anomalies: [
          {
            categoryId: "cat1",
            categoryName: "Restaurantes",
            amount: 1200,
            averageAmount: 600,
            deviationPercentage: 100,
            severity: "HIGH",
          }
        ],
        topCategories: [
            { name: "Moradia", amount: 2500, percentage: 40 },
            { name: "Restaurantes", amount: 1200, percentage: 20 },
            { name: "Transporte", amount: 800, percentage: 12 },
        ]
      });
    }, 800);
  });
}
