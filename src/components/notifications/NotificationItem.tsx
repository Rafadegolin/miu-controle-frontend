import { Notification, NotificationType } from "@/types/notifications";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  AlertTriangle,
  AlertOctagon,
  Trophy,
  Flag,
  Calendar,
  Info,
  CheckCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/contexts/NotificationsContext";
import { Button } from "@/components/ui/Button";

interface NotificationItemProps {
  notification: Notification;
  onClose?: () => void;
}

export function NotificationItem({ notification, onClose }: NotificationItemProps) {
  const { markAsRead, deleteNotification } = useNotifications();

  const getIcon = () => {
    switch (notification.type) {
      case NotificationType.BUDGET_ALERT:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case NotificationType.BUDGET_EXCEEDED:
        return <AlertOctagon className="h-4 w-4 text-red-500" />;
      case NotificationType.GOAL_ACHIEVED:
        return <Trophy className="h-4 w-4 text-yellow-400" />;
      case NotificationType.GOAL_MILESTONE:
        return <Flag className="h-4 w-4 text-blue-500" />;
      case NotificationType.BILL_DUE:
        return <Calendar className="h-4 w-4 text-orange-500" />;
      case NotificationType.SYSTEM:
      default:
        return <Info className="h-4 w-4 text-[#32d6a5]" />;
    }
  };

  const getBgColor = () => {
    if (notification.read) return "bg-transparent hover:bg-white/5";
    return "bg-[#32d6a5]/5 hover:bg-[#32d6a5]/10";
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!notification.read) {
      markAsRead([notification.id]);
    }
    onClose?.();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNotification(notification.id);
  }

  return (
    <div
      className={cn(
        "relative flex items-start gap-3 p-4 transition-colors cursor-pointer border-b border-border/50 last:border-0",
        getBgColor()
      )}
      onClick={handleClick}
    >
      <div className="mt-1 shrink-0 bg-background/50 p-2 rounded-full border border-border">
        {getIcon()}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
            <p className={cn("text-sm font-medium leading-none", !notification.read && "text-foreground")}>
            {notification.title}
            </p>
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
            {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
                locale: ptBR,
            })}
            </span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {notification.message}
        </p>
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleDelete}>
              <X className="h-3 w-3" />
          </Button>
      </div>
      {!notification.read && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[#32d6a5]" />
      )}
    </div>
  );
}
