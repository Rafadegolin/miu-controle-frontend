import { apiClient } from "./api-client";
import type { Category, CreateCategoryDto, CategoryStats } from "@/types/api";

export const categoriesActions = {
  async getCategories(type?: string): Promise<Category[]> {
    const response = await apiClient.get<Category[]>("/categories", {
      params: { type },
    });
    return response.data;
  },

  async getCategoriesTree(): Promise<Category[]> {
    const response = await apiClient.get<Category[]>("/categories/tree");
    return response.data;
  },

  async createCategory(data: CreateCategoryDto): Promise<Category> {
    const response = await apiClient.post<Category>("/categories", data);
    return response.data;
  },

  async updateCategory(
    id: string,
    data: Partial<CreateCategoryDto>
  ): Promise<Category> {
    const response = await apiClient.patch<Category>(`/categories/${id}`, data);
    return response.data;
  },

  async deleteCategory(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete(`/categories/${id}`);
    return response.data;
  },

  async getCategoryStats(
    id: string,
    params?: { startDate?: string; endDate?: string }
  ): Promise<CategoryStats> {
    const response = await apiClient.get<CategoryStats>(
      `/categories/${id}/stats`,
      { params }
    );
    return response.data;
  }
};
