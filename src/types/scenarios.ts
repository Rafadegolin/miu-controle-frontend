export enum ScenarioType {
  BIG_PURCHASE = "BIG_PURCHASE",
  INCOME_LOSS = "INCOME_LOSS",
  NEW_RECURRING = "NEW_RECURRING",
  EMERGENCY = "EMERGENCY",
}

export interface SimulationRequest {
  type: ScenarioType;
  amount?: number;
  installments?: number;
  description?: string;
  startDate?: string; // ISO Date
}

export interface SimulationResult {
  isViable: boolean;
  lowestBalance: number;
  projectedBalance12Months: number[];
  recommendations: string[];
  baselineProjection: number[]; // Adding baseline for comparison in chart
}

export type ScenarioIcon = "car" | "briefcase" | "refresh" | "alert";
