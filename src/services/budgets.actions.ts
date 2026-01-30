"use server";

import { Budget, CreateBudgetDto, BudgetsSummaryResponse, BudgetPeriod, BudgetStatusResponse } from "@/types/api";

// Mock Data
let mockBudgets: BudgetStatusResponse[] = [
  {
    budget: {
      id: "b1",
      userId: "u1",
      categoryId: "cat_food", 
      amount: 1500,
      period: BudgetPeriod.MONTHLY,
      startDate: new Date().toISOString(),
      alertPercentage: 80,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: { id: "cat_food", name: "Alimentação", color: "#FF5733", type: "EXPENSE" } as any
    },
    spent: 1200,
    remaining: 300,
    percentage: 80,
    status: "WARNING",
    isOverBudget: false
  },
  {
    budget: {
      id: "b2",
      userId: "u1",
      categoryId: "cat_transport",
      amount: 800,
      period: BudgetPeriod.MONTHLY,
      startDate: new Date().toISOString(),
      alertPercentage: 80,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: { id: "cat_transport", name: "Transporte", color: "#33FF57", type: "EXPENSE" } as any
    },
    spent: 400,
    remaining: 400,
    percentage: 50,
    status: "OK",
    isOverBudget: false
  },
    {
    budget: {
      id: "b3",
      userId: "u1",
      categoryId: "cat_leisure",
      amount: 500,
      period: BudgetPeriod.MONTHLY,
      startDate: new Date().toISOString(),
      alertPercentage: 80,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: { id: "cat_leisure", name: "Lazer", color: "#3357FF", type: "EXPENSE" } as any
    },
    spent: 600,
    remaining: -100,
    percentage: 120,
    status: "EXCEEDED",
    isOverBudget: true
  }
];

export async function getBudgets(month?: string): Promise<BudgetsSummaryResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
        const totalBudgeted = mockBudgets.reduce((acc, curr) => acc + curr.budget.amount, 0);
        const totalSpent = mockBudgets.reduce((acc, curr) => acc + curr.spent, 0);
        const overallPercentage = totalBudgeted > 0 ? (totalSpent / totalBudgeted) * 100 : 0;

        resolve({
            totalBudgeted,
            totalSpent,
            overallPercentage,
            budgets: [...mockBudgets]
        });
    }, 600);
  });
}

export async function getBudgetsSummary(month?: string): Promise<BudgetsSummaryResponse> {
    return getBudgets(month);
}

export async function getBudgetStatus(id: string): Promise<BudgetStatusResponse> {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          const found = mockBudgets.find(b => b.budget.id === id);
          if (found) resolve(found);
          else reject(new Error("Budget not found"));
      }, 400);
  });
}

export async function createBudget(data: CreateBudgetDto): Promise<void> {
  return new Promise((resolve) => {
      setTimeout(() => {
          console.log("Budget Created Mock", data);
          resolve();
      }, 500);
  });
}

export async function updateBudget(id: string, data: Partial<CreateBudgetDto>): Promise<void> {
  return new Promise((resolve) => {
      setTimeout(() => {
          console.log("Budget Updated Mock", id, data);
          resolve();
      }, 500);
  });
}

export async function deleteBudget(id: string): Promise<void> {
  return new Promise((resolve) => {
      setTimeout(() => {
          console.log("Budget Deleted Mock", id);
          resolve();
      }, 500);
  });
}

export const budgetsActions = {
  getBudgets,
  getBudgetsSummary,
  getBudgetStatus,
  createBudget,
  updateBudget,
  deleteBudget
};
