import { apiClient } from "./api-client";
import { CreateFeedbackDto, Feedback, UpdateFeedbackStatusDto } from "@/types/api";

const BASE_URL = "/feedback";

// Mock Data for fallback
let mockFeedbacks: Feedback[] = [
    {
        id: "fb_1",
        userId: "user_01",
        type: "BUG",
        title: "Erro ao salvar meta",
        description: "Tentei criar uma meta e deu erro 500.",
        status: "PENDING",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: { id: "user_01", fullName: "Rafael Degolin" }
    },
    {
        id: "fb_2",
        userId: "user_01",
        type: "SUGGESTION",
        title: "Dark mode mais escuro",
        description: "Gostaria de um tema com preto absoluto.",
        status: "RESOLVED",
        adminResponse: "Implementado na v2.0",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
        user: { id: "user_01", fullName: "Rafael Degolin" }
    }
];

export const feedbackActions = {
  async submitFeedback(data: CreateFeedbackDto): Promise<Feedback> {
    try {
        const response = await apiClient.post<Feedback>(BASE_URL, data);
        return response.data;
    } catch (error) {
        console.warn("Feedback API unreachable, using mock.");
        return new Promise((resolve) => {
            setTimeout(() => {
                const newFeedback: Feedback = {
                    id: `fb_${Date.now()}`,
                    userId: "user_01", // Mock user
                    ...data,
                    status: "PENDING",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    user: { id: "user_01", fullName: "Rafael Degolin" }
                };
                mockFeedbacks.unshift(newFeedback);
                resolve(newFeedback);
            }, 600);
        });
    }
  },

  async getUserFeedbacks(): Promise<Feedback[]> {
    try {
        const response = await apiClient.get<Feedback[]>(`${BASE_URL}/me`);
        return response.data;
    } catch (error) {
        console.warn("Feedback API unreachable, using mock.");
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockFeedbacks.filter(f => f.userId === "user_01")), 600);
        });
    }
  },

  // ADMIN
  async getAllFeedbacks(status?: string): Promise<Feedback[]> {
    try {
        const query = status ? `?status=${status}` : '';
        const response = await apiClient.get<Feedback[]>(`${BASE_URL}/admin/all${query}`);
        return response.data;
    } catch (error) {
         console.warn("Feedback API unreachable, using mock.");
        return new Promise((resolve) => {
            setTimeout(() => {
                if (status) {
                    resolve(mockFeedbacks.filter(f => f.status === status));
                } else {
                    resolve([...mockFeedbacks]);
                }
            }, 600);
        });
    }
  },

  async updateFeedbackStatus(id: string, data: UpdateFeedbackStatusDto): Promise<Feedback> {
    try {
        const response = await apiClient.patch<Feedback>(`${BASE_URL}/admin/${id}`, data);
        return response.data;
    } catch (error) {
         console.warn("Feedback API unreachable, using mock.");
        return new Promise((resolve) => {
            setTimeout(() => {
                const index = mockFeedbacks.findIndex(f => f.id === id);
                if (index !== -1) {
                    mockFeedbacks[index] = {
                        ...mockFeedbacks[index],
                        status: data.status,
                        adminResponse: data.adminResponse,
                        updatedAt: new Date().toISOString()
                    };
                    resolve(mockFeedbacks[index]);
                } else {
                    throw new Error("Feedback not found");
                }
            }, 600);
        });
    }
  }
};
