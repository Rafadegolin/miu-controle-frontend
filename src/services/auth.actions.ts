import { apiClient } from "./api-client";
import { TokenService } from "./token.service";
import type { 
  AuthResponse, 
  LoginDto, 
  RegisterDto, 
  Session 
} from "@/types/api";

export const authActions = {
  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/register", data);
    TokenService.setTokens(response.data.accessToken, response.data.refreshToken);
    return response.data;
  },

  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/login", data);
    TokenService.setTokens(response.data.accessToken, response.data.refreshToken);
    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      TokenService.clearTokens();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  },

  async getSessions(): Promise<Session[]> {
    const response = await apiClient.get<Session[]>("/auth/sessions");
    return response.data;
  },

  async revokeSession(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete(`/auth/sessions/${id}`);
    return response.data;
  },

  async revokeAllSessions(): Promise<{ message: string }> {
    const response = await apiClient.delete("/auth/sessions/revoke-all");
    return response.data;
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return response.data;
  },

  async verifyResetToken(token: string): Promise<{ valid: boolean }> {
    const response = await apiClient.post("/auth/verify-reset-token", { token });
    return response.data;
  },

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const response = await apiClient.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  }
};
