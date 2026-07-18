import { AxiosError } from "axios";
import { apiClient } from "./api-client";
import { EmergencyFund, EmergencyFundWithdrawal } from "@/types/api";

interface EmergencyFundStatus {
  currentAmount: number;
  targetAmount: number;
  monthsCovered: number;
  status: "CRITICAL" | "WARNING" | "SECURE";
  percentage: number;
}

interface EmergencyFundWithdrawalApi {
  id: string;
  fundId: string;
  amount: number;
  reason: string;
  approved: boolean;
  createdAt: string;
}

// GET /emergency-fund/status → adapta para o tipo EmergencyFund consumido pela UI.
// (o /status devolve zeros — não 404 — quando o fundo ainda não existe)
export async function getEmergencyFundStatus(): Promise<EmergencyFund> {
  const res = await apiClient.get<EmergencyFundStatus>(
    "/emergency-fund/status",
  );
  const s = res.data;
  return {
    id: "",
    userId: "",
    currentAmount: s.currentAmount,
    targetAmount: s.targetAmount,
    monthsCovered: s.monthsCovered,
    status: s.status,
    monthlyExpensesAverage:
      s.monthsCovered > 0 ? s.currentAmount / s.monthsCovered : 0,
    isSetup: s.targetAmount > 0,
    lastUpdated: new Date().toISOString(),
  };
}

export async function setupEmergencyFund(): Promise<EmergencyFund> {
  await apiClient.post("/emergency-fund/setup");
  return getEmergencyFundStatus();
}

export async function contributeToFund(amount: number): Promise<void> {
  try {
    await apiClient.post("/emergency-fund/contribute", { amount });
  } catch (err) {
    // Fundo ainda não inicializado: cria e tenta de novo.
    if ((err as AxiosError).response?.status === 404) {
      await apiClient.post("/emergency-fund/setup");
      await apiClient.post("/emergency-fund/contribute", { amount });
      return;
    }
    throw err;
  }
}

export async function withdrawFromFund(
  amount: number,
  reason: string,
): Promise<void> {
  await apiClient.post("/emergency-fund/withdraw", { amount, reason });
}

export async function getFundHistory(): Promise<EmergencyFundWithdrawal[]> {
  const res = await apiClient.get<EmergencyFundWithdrawalApi[]>(
    "/emergency-fund/history",
  );
  return res.data.map((w) => ({
    id: w.id,
    amount: w.amount,
    reason: w.reason,
    date: w.createdAt,
    userId: "",
  }));
}
