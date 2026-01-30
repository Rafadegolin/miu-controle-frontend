export enum ScenarioType {
  BIG_PURCHASE = "BIG_PURCHASE",
  INCOME_LOSS = "INCOME_LOSS",
  NEW_RECURRING = "NEW_RECURRING",
  EMERGENCY = "EMERGENCY",
  AFFORDABILITY = "AFFORDABILITY",
}

export interface SimulationRequest {
  type: ScenarioType;
  amount?: number;
  installments?: number;
  description?: string;
  startDate?: string; // ISO Date
  
  // Affordability
  categoryId?: string;
}

export interface SimulationResult {
  isViable: boolean;
  lowestBalance: number;
  projectedBalance12Months: number[];
  recommendations: string[];
  baselineProjection: number[]; 

  // Affordability specific
  score?: number; // 0-100
  status?: "CAN_AFFORD" | "CAUTION" | "NOT_RECOMMENDED";
  badgeColor?: string;
  dimensions?: {
      balanceScore: number;
      budgetScore: number;
      reserveScore: number;
      impactScore: number;
      historyScore: number;
      timingScore: number;
  };
}

export type ScenarioIcon = "car" | "briefcase" | "refresh" | "alert";
