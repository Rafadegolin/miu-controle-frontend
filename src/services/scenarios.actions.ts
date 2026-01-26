"use server";

import { apiClient } from "@/services/api-client";
import { SimulationRequest, SimulationResult } from "@/types/scenarios";

// Note: Using "use server" is not strictly required here if we aren't using server actions directly in form action props,
// but sticking to the pattern of "services/actions" calling the API.
// Since the prompt asked for "actions isolado", I'm assuming a client-callable service module.

export async function simulateScenario(data: SimulationRequest): Promise<SimulationResult> {
  // Mocking response for now if backend is not ready, or calling actual endpoint.
  // Assuming endpoint exists as per documentation.
  try {
     const response = await apiClient.post<SimulationResult>("/scenarios/simulate", data);
     return response.data;
  } catch (error) {
     console.error("Simulation failed", error);
     throw error;
  }
}
