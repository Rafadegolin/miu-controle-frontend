export interface ActionPlanItem {
  type: 'CUT' | 'SAVE' | 'EARN';
  title: string;        // "Cortar em Lazer"
  description: string;  // "Reduzir para R$ 300,00"
  value?: number;
}

export interface SuggestedCut {
  categoryId: string;
  categoryName: string;
  currentAverage: number;
  amount: number;
}

// Espelha o retorno de GET /planning/goal/:id/calculate e o SavePlanDto.
export interface Plan {
  isViable: boolean;
  monthlyDeposit: number;
  months: number;
  margin: number; // folga mensal (surplus − depósito)
  recommendations: string[];
  actionPlan: ActionPlanItem[];
  suggestedCuts: SuggestedCut[];
}

export interface GoalPlan {
  id: string;
  goalId: string;
  isViable: boolean;
  createdAt: string;
  actions: ActionPlanItem[];
}
