export interface ActionPlanItem {
  type: 'CUT' | 'SAVE' | 'EARN';
  title: string;        // "Cortar em Lazer"
  description: string;  // "Reduzir para R$ 300,00"
  value?: number;
}

export interface Plan {
  isViable: boolean;
  monthlyDeposit: number;
  margin: number;       // Surplus or Deficit
  actionPlan: ActionPlanItem[];
  suggestedCuts: Array<{ category: string; amount: number }>;
}

export interface GoalPlan {
  id: string;
  goalId: string;
  isViable: boolean;
  createdAt: string;
  actions: ActionPlanItem[];
}
