import { apiClient } from "./api-client";
import { 
  AiConfig, 
  UpdateAiConfigDto, 
  AiProvider, 
  AiKeyTestDto,
  AiUsageStatsResponse,
  AiCategorizationStatsResponse
} from "@/types/api";

export const aiSettingsActions = {
  async getAiConfig(): Promise<AiConfig> {
    const response = await apiClient.get<AiConfig>("/ai/config");
    return response.data;
  },

  async updateAiConfig(data: UpdateAiConfigDto): Promise<AiConfig> {
    const response = await apiClient.post<AiConfig>("/ai/config", data);
    return response.data;
  },

  async testAiKey(provider: AiProvider, apiKey: string): Promise<{ valid: boolean; message: string }> {
    const payload: AiKeyTestDto = { provider, apiKey };
    // Adjust payload strictly to what backend expects if it differs from DTO.
    // Documentation says separate payloads: { "openaiApiKey": "..." } OR { "geminiApiKey": "..." }
    // But let's follow the standard usually. Wait, doc says:
    // Payload: { "openaiApiKey": "..." } ou { "geminiApiKey": "..." }
    // Let's adapt to that specific structure mentioned in the GUIDE.
    
    let actualPayload: any = {};
    if (provider === AiProvider.OPENAI) {
        actualPayload = { openaiApiKey: apiKey };
    } else {
        actualPayload = { geminiApiKey: apiKey };
    }

    const response = await apiClient.post<{ valid: boolean; message: string }>("/ai/config/test", actualPayload);
    return response.data;
  },

  async getUsageStats(): Promise<AiUsageStatsResponse> {
    const response = await apiClient.get<AiUsageStatsResponse>("/ai/usage-stats");
    return response.data;
  },

  async getCategorizationStats(): Promise<AiCategorizationStatsResponse> {
    const response = await apiClient.get<AiCategorizationStatsResponse>("/ai/categorization-stats");
    return response.data;
  }
};
