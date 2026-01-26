import { apiClient } from "./api-client";
import type { Recommendation } from "@/types/api";

export const recommendationsActions = {
  // Get active recommendations
  async getRecommendations(): Promise<Recommendation[]> {
    const response = await apiClient.get<Recommendation[]>("/recommendations");
    return response.data;
  },

  // Apply a recommendation (mark as resolved/applied)
  async applyRecommendation(id: string): Promise<void> {
    await apiClient.post(`/recommendations/${id}/apply`);
  },

  // Dismiss a recommendation
  async dismissRecommendation(id: string): Promise<void> {
    await apiClient.post(`/recommendations/${id}/dismiss`);
  },
};
