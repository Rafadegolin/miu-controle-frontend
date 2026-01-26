export enum NotificationType {
  BUDGET_ALERT = "BUDGET_ALERT",
  BUDGET_EXCEEDED = "BUDGET_EXCEEDED",
  GOAL_ACHIEVED = "GOAL_ACHIEVED",
  GOAL_MILESTONE = "GOAL_MILESTONE",
  BILL_DUE = "BILL_DUE",
  SYSTEM = "SYSTEM",
}

export interface NotificationData {
  [key: string]: any;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  data: NotificationData;
  read: boolean;
  createdAt: string;
}

export interface GetNotificationsParams {
  unreadOnly?: boolean;
  cursor?: string;
  take?: number;
}

export interface NotificationListResponse {
  items: Notification[];
  nextCursor?: string;
  hasMore: boolean;
}

export interface UnreadCountResponse {
  count: number;
}
