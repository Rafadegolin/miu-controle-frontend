import { apiClient } from "./api-client";
import {
  Budget,
  CreateBudgetDto,
  BudgetsSummaryResponse,
  BudgetStatusResponse,
} from "@/types/api";

// Item retornado por GET /budgets (Budget + campos calculados).
type BudgetApiItem = Budget & {
  spent: number;
  remaining: number;
  percentage: number;
  status: "OK" | "WARNING" | "EXCEEDED";
  transactions?: unknown[];
};

function toStatusResponse(item: BudgetApiItem): BudgetStatusResponse {
  const { spent, remaining, percentage, status, transactions, ...budget } = item;
  void transactions;
  return {
    budget: budget as Budget,
    spent,
    remaining,
    percentage,
    status,
    isOverBudget: percentage >= 100,
  };
}

function buildSummary(items: BudgetStatusResponse[]): BudgetsSummaryResponse {
  const totalBudgeted = items.reduce((acc, b) => acc + b.budget.amount, 0);
  const totalSpent = items.reduce((acc, b) => acc + b.spent, 0);
  const overallPercentage =
    totalBudgeted > 0 ? (totalSpent / totalBudgeted) * 100 : 0;
  return { totalBudgeted, totalSpent, overallPercentage, budgets: items };
}

export async function getBudgets(
  period?: string,
): Promise<BudgetsSummaryResponse> {
  const res = await apiClient.get<BudgetApiItem[]>("/budgets", {
    params: period ? { period } : undefined,
  });
  return buildSummary(res.data.map(toStatusResponse));
}

export async function getBudgetsSummary(): Promise<BudgetsSummaryResponse> {
  return getBudgets();
}

export async function getBudgetStatus(
  id: string,
): Promise<BudgetStatusResponse> {
  const res = await apiClient.get<BudgetApiItem>(`/budgets/${id}`);
  return toStatusResponse(res.data);
}

export async function createBudget(data: CreateBudgetDto): Promise<Budget> {
  const res = await apiClient.post<Budget>("/budgets", data);
  return res.data;
}

export async function updateBudget(
  id: string,
  data: Partial<CreateBudgetDto>,
): Promise<Budget> {
  const res = await apiClient.patch<Budget>(`/budgets/${id}`, data);
  return res.data;
}

export async function deleteBudget(id: string): Promise<void> {
  await apiClient.delete(`/budgets/${id}`);
}
