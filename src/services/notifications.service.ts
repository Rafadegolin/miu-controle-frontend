import { apiClient as api } from "@/services/api-client";
import {
  GetNotificationsParams,
  NotificationListResponse,
  UnreadCountResponse,
} from "@/types/notifications";

export const notificationsService = {
  getNotifications: async (
    params: GetNotificationsParams = {}
  ): Promise<NotificationListResponse> => {
    const searchParams = new URLSearchParams();
    if (params.unreadOnly) searchParams.append("unreadOnly", "true");
    if (params.cursor) searchParams.append("cursor", params.cursor);
    if (params.take) searchParams.append("take", params.take.toString());

    return api.get<NotificationListResponse>(`/notifications?${searchParams.toString()}`).then(res => res.data);
  },

  getUnreadCount: async (): Promise<UnreadCountResponse> => {
    return api.get<UnreadCountResponse>("/notifications/unread-count").then(res => res.data);
  },

  markAsRead: async (ids: string[]): Promise<void> => {
    return api.post("/notifications/mark-as-read", { ids }).then(res => res.data);
  },

  markAllAsRead: async (): Promise<void> => {
    return api.post("/notifications/mark-all-as-read").then(res => res.data);
  },

  deleteNotification: async (id: string): Promise<void> => {
    return api.delete(`/notifications/${id}`).then(res => res.data);
  },
};
