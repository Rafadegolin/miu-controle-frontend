import { apiClient } from "./api-client";

export const aiActions = {
  async getAdvice(context: string): Promise<{ advice: string }> {
    const response = await apiClient.post("/ai/advice", { context });
    return response.data;
  },

  async generatePlan(goalId: string): Promise<{ plan: string; steps: string[] }> {
    const response = await apiClient.post(`/ai/planning/${goalId}`);
    return response.data;
  },
  
  async chat(message: string): Promise<{ reply: string }> {
    const response = await apiClient.post("/ai/chat", { message });
    return response.data;
  }
};
