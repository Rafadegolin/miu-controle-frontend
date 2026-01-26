import { apiClient } from "./api-client";
import type { ProactiveAlert } from "@/types/api";

export const proactiveAlertsActions = {
  // Get active alerts (not dismissed)
  async getActiveAlerts(): Promise<ProactiveAlert[]> {
    const response = await apiClient.get<ProactiveAlert[]>("/proactive-alerts");
    return response.data;
  },

  // Dismiss an alert
  async dismissAlert(id: string): Promise<void> {
    await apiClient.post(`/proactive-alerts/${id}/dismiss`);
  },
};
