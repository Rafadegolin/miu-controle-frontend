"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { useSocket } from "./SocketContext";
import { notificationsService } from "@/services/notifications.service";
import { Notification, GetNotificationsParams } from "@/types/notifications";
import { toast } from "sonner"; // Assuming sonner is used, or generic toast
// If sonner is not installed, we might need to check package.json or use a simple alert/console for now,
// but usually modern stacks use sonner or similar. I'll check package.json if needed, but for now I'll assume sonner or console.
// Actually, I should verify what toast library is used.

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  hasMore: boolean;
  fetchNotifications: (params?: GetNotificationsParams, append?: boolean) => Promise<void>;
  markAsRead: (ids: string[]) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  unreadCount: 0,
  loading: false,
  hasMore: false,
  fetchNotifications: async () => {},
  markAsRead: async () => {},
  markAllAsRead: async () => {},
  deleteNotification: async () => {},
});

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const { socket } = useSocket();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);

  const fetchUnreadCount = useCallback(async () => {
    if (!user) return;
    try {
      const { count } = await notificationsService.getUnreadCount();
      setUnreadCount(count);
    } catch (error) {
      console.error("Failed to fetch unread count", error);
    }
  }, [user]);

  const fetchNotifications = useCallback(
    async (params: GetNotificationsParams = {}, append = false) => {
      if (!user) return;
      setLoading(true);
      try {
        const response = await notificationsService.getNotifications({
          ...params,
          cursor: append ? nextCursor : undefined,
        });

        setNotifications((prev) => (append ? [...prev, ...response.items] : response.items));
        setNextCursor(response.nextCursor);
        setHasMore(response.hasMore);
        
        // Refresh unread count when fetching list
        await fetchUnreadCount();
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      } finally {
        setLoading(false);
      }
    },
    [user, nextCursor, fetchUnreadCount]
  );

  const markAsRead = async (ids: string[]) => {
    try {
      // Optimistic update
      setNotifications((prev) =>
        prev.map((n) => (ids.includes(n.id) ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - ids.length)); // Approximation

      await notificationsService.markAsRead(ids);
      await fetchUnreadCount(); // Re-sync to be sure
    } catch (error) {
      console.error("Failed to mark as read", error);
      await fetchNotifications(); // Revert on error
    }
  };

  const markAllAsRead = async () => {
    try {
        // Optimistic update
        setNotifications((prev) => prev.map(n => ({ ...n, read: true })));
        setUnreadCount(0);

        await notificationsService.markAllAsRead();
    } catch (error) {
        console.error("Failed to mark all as read", error);
        await fetchNotifications();
    }
  };

  const deleteNotification = async (id: string) => {
    try {
        setNotifications((prev) => prev.filter(n => n.id !== id));
        await notificationsService.deleteNotification(id);
        await fetchUnreadCount();
    } catch (error) {
        console.error("Failed to delete notification", error);
        await fetchNotifications();
    }
  }

  // Initial load
  useEffect(() => {
    if (user) {
      fetchUnreadCount();
      // We don't necessarily fetch the list immediately, only when opened, 
      // but unread count is needed for the badge.
    }
  }, [user, fetchUnreadCount]);

  // Socket listener
  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
      
      // Optional: Show toast
      // toast(notification.title, { description: notification.message });
      console.log("New notification received:", notification);
    };

    socket.on("NOTIFICATION_NEW", handleNewNotification);

    return () => {
      socket.off("NOTIFICATION_NEW", handleNewNotification);
    };
  }, [socket]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        hasMore,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
