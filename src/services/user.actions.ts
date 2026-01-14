import { apiClient } from "./api-client";
import type { User } from "@/types/api";

export const userActions = {
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>("/users/me");
    return response.data;
  },

  async updateCurrentUser(data: Partial<User>): Promise<User> {
    const response = await apiClient.patch<User>("/users/me", data);
    return response.data;
  },

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await apiClient.post("/users/me/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  async deleteAvatar(): Promise<{ message: string }> {
    const response = await apiClient.delete("/users/me/avatar");
    return response.data;
  },

  async changePassword(data: any): Promise<{ message: string }> {
    const response = await apiClient.patch("/users/me/password", data);
    return response.data;
  },

  async deleteMyAccount(): Promise<{ message: string }> {
    const response = await apiClient.delete("/users/me");
    return response.data;
  },
};
