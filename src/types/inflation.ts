export interface InflationParams {
  inflationRate: number;    // % a.a
  salaryAdjustment: number; // % a.a
  periodMonths: number;
}

export interface InflationScenario {
  id: string;
  name: string;
  description: string;
  rate: number; // % a.a
}

export interface GoalImpact {
  goalId: string;
  goalName: string;
  currentCost: number;
  projectedCost: number;
  difference: number;
}

export interface InflationImpact {
  realGain: number;                 // %
  purchasingPowerProjected: number; // Value of R$ 1000 in future
  goalsImpact: GoalImpact[];
  mensalBudgetIncrease: number;     // Estimated increase in monthly budget needed
}
