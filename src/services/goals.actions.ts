import { apiClient } from "./api-client";
import type {
  Goal,
  CreateGoalDto,
  ContributeGoalDto,
  GoalSummaryResponse,
  AddPurchaseLinkDto,
  PurchaseLinksSummaryResponse,
  GoalStatus
} from "@/types/api";

// --- MOCK DATA FOR DEMONSTRATION ---
let globalGoals: Goal[] = [
    {
        id: "goal_root_1",
        userId: "user_01",
        name: "Viagem Europa 2026",
        targetAmount: 30000,
        currentAmount: 5000,
        targetDate: "2026-06-01",
        color: "#32d6a5",
        priority: 1,
        status: "ACTIVE" as GoalStatus,
        distributionStrategy: "PROPORTIONAL",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        hierarchyLevel: 0
    },
    {
        id: "goal_child_1",
        userId: "user_01",
        name: "Passagens Aéreas",
        targetAmount: 8000,
        currentAmount: 2000,
        color: "#3498db",
        priority: 1,
        status: "ACTIVE" as GoalStatus,
        parentId: "goal_root_1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        hierarchyLevel: 1
    },
    {
        id: "goal_child_2",
        userId: "user_01",
        name: "Hospedagem",
        targetAmount: 10000,
        currentAmount: 3000,
        color: "#e74c3c",
        priority: 2,
        status: "ACTIVE" as GoalStatus,
        parentId: "goal_root_1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        hierarchyLevel: 1
    },
    {
        id: "goal_standalone",
        userId: "user_01",
        name: "Trocar de Carro",
        targetAmount: 80000,
        currentAmount: 15000,
        targetDate: "2025-12-01",
        color: "#f1c40f",
        priority: 3,
        status: "ACTIVE" as GoalStatus,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        hierarchyLevel: 0
    }
];
// -----------------------------------

export const goalsActions = {
  // Mocked GET to return the local hierarchy
  async getGoals(status?: string): Promise<Goal[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
             // Return simplified list, normally backend does the tree building if requested
             // For now we return flat list, the UI can build the tree or filtered list
             const filtered = status 
                ? globalGoals.filter(g => g.status === status)
                : globalGoals;
             resolve([...filtered]);
        }, 600);
    });
  },

  async getGoal(id: string): Promise<Goal> {
     return new Promise((resolve, reject) => {
         const goal = globalGoals.find(g => g.id === id);
         if (goal) {
             // Attach children for detail view
             const children = globalGoals.filter(g => g.parentId === id);
             resolve({ ...goal, children });
         } else {
             reject("Goal not found");
         }
     });
  },

  async createGoal(data: CreateGoalDto & { parentId?: string; distributionStrategy?: "PROPORTIONAL" | "SEQUENTIAL" }): Promise<Goal> {
    return new Promise((resolve) => {
        const newGoal: Goal = {
            id: `goal_${Date.now()}`,
            userId: "user_01",
            name: data.name,
            targetAmount: data.targetAmount,
            currentAmount: 0,
            targetDate: data.targetDate,
            color: data.color || "#32d6a5",
            icon: data.icon,
            priority: data.priority || 1,
            status: "ACTIVE" as GoalStatus,
            parentId: data.parentId,
            distributionStrategy: data.distributionStrategy,
            // Calculate level
            hierarchyLevel: data.parentId ? 1 : 0, // Simplified for mock
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        globalGoals.push(newGoal);
        resolve(newGoal);
    });
  },

  async updateGoal(id: string, data: Partial<CreateGoalDto>): Promise<Goal> {
    const response = await apiClient.patch<Goal>(`/goals/${id}`, data);
    // Sync mock
    const idx = globalGoals.findIndex(g => g.id === id);
    if(idx >= 0) globalGoals[idx] = { ...globalGoals[idx], ...response.data };
    return response.data;
  },

  async deleteGoal(id: string): Promise<{ message: string }> {
     return new Promise((resolve) => {
         globalGoals = globalGoals.filter(g => g.id !== id);
         resolve({ message: "Deleted" });
     });
  },

  async contributeToGoal(
    id: string,
    data: ContributeGoalDto
  ): Promise<{ contribution: any; goal: Goal }> {
     return new Promise((resolve) => {
         setTimeout(() => {
            const goalIndex = globalGoals.findIndex(g => g.id === id);
            if (goalIndex === -1) return;

            const goal = globalGoals[goalIndex];
            const children = globalGoals.filter(g => g.parentId === id);

            // 1. Add to main goal
            goal.currentAmount += data.amount;

            // 2. Distribute if Parent
            if (children.length > 0 && goal.distributionStrategy) {
                if (goal.distributionStrategy === "PROPORTIONAL") {
                    // Simple logic: split based on target size
                    const totalChildrenTarget = children.reduce((acc, c) => acc + c.targetAmount, 0);
                    children.forEach((child) => {
                        const share = (child.targetAmount / totalChildrenTarget) * data.amount;
                        child.currentAmount += share;
                    });
                } else if (goal.distributionStrategy === "SEQUENTIAL") {
                    // Fill by priority (lower number = higher priority)
                    children.sort((a, b) => a.priority - b.priority);
                    let remaining = data.amount;
                    
                    for (const child of children) {
                        if (remaining <= 0) break;
                        const needed = child.targetAmount - child.currentAmount;
                        const toAdd = Math.min(needed, remaining);
                        child.currentAmount += toAdd;
                        remaining -= toAdd;
                    }
                }
            }

            resolve({ contribution: {}, goal: { ...goal } });
         }, 500);
     });
  },

  async withdrawFromGoal(
    id: string,
    amount: number
  ): Promise<{ contribution: any; goal: Goal }> {
      return new Promise((resolve) => {
         setTimeout(() => {
            const goal = globalGoals.find(g => g.id === id);
            if(goal) {
                goal.currentAmount -= amount;
                resolve({ contribution: {}, goal: { ...goal } });
            }
         }, 500);
     });
  },

  async getGoalsSummary(): Promise<GoalSummaryResponse> {
    const total = globalGoals.length;
    const active = globalGoals.filter(g => g.status === "ACTIVE").length;
    const completed = globalGoals.filter(g => g.status === "COMPLETED").length;
    
    return Promise.resolve({
        total,
        active,
        completed,
        cancelled: 0,
        totalTargeted: globalGoals.reduce((acc, g) => acc + g.targetAmount, 0),
        totalSaved: globalGoals.reduce((acc, g) => acc + g.currentAmount, 0),
        overallPercentage: 0,
        goals: globalGoals
    });
  },

  async uploadGoalImage(
    id: string,
    file: File
  ): Promise<{ message: string; goal: Goal }> {
    // Mock upload
    return new Promise((resolve) => resolve({ message: "OK", goal: globalGoals.find(g => g.id === id)! }));
  },

  async deleteGoalImage(id: string): Promise<{ message: string; goal: Goal }> {
     return new Promise((resolve) => resolve({ message: "OK", goal: globalGoals.find(g => g.id === id)! }));
  },

  async addPurchaseLink(
    goalId: string,
    data: AddPurchaseLinkDto
  ): Promise<{ message: string; goal: Goal }> {
     // Mock
    return new Promise((resolve) => resolve({ message: "OK", goal: globalGoals.find(g => g.id === goalId)! }));
  },

  async updatePurchaseLink(
    goalId: string,
    linkId: string,
    data: Partial<AddPurchaseLinkDto>
  ): Promise<{ message: string; goal: Goal }> {
     // Mock
     return new Promise((resolve) => resolve({ message: "OK", goal: globalGoals.find(g => g.id === goalId)! }));
  },

  async deletePurchaseLink(
    goalId: string,
    linkId: string
  ): Promise<{ message: string; goal: Goal }> {
    // Mock
    return new Promise((resolve) => resolve({ message: "OK", goal: globalGoals.find(g => g.id === goalId)! }));
  },

  async getPurchaseLinksSummary(
    goalId: string
  ): Promise<PurchaseLinksSummaryResponse> {
    // Mock
    return Promise.resolve({
        total: 0,
        totalBRL: 0,
        byCurrency: {},
        links: []
    });
  }
};
