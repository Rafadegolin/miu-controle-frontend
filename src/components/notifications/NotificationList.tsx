import { useEffect, useRef } from "react";
import { useNotifications } from "@/contexts/NotificationsContext";
import { NotificationItem } from "./NotificationItem";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, CheckCheck, BellOff } from "lucide-react";
import { PopoverContent } from "@/components/ui/popover";

interface NotificationListProps {
  onClose?: () => void;
}

export function NotificationList({ onClose }: NotificationListProps) {
  const {
    notifications,
    loading,
    hasMore,
    fetchNotifications,
    markAllAsRead,
    unreadCount,
  } = useNotifications();
  
  // Ref for infinite scroll if needed, but for now we might just load on mount
  // Simple "Load More" implementation for better UX in dropdown
  
  useEffect(() => {
    fetchNotifications({}, false);
  }, []); // Initial load

  const handleLoadMore = () => {
    fetchNotifications({}, true);
  };

  return (
    <PopoverContent className="w-80 p-0 sm:w-96 rounded-xl border-border bg-card/95 backdrop-blur-xl shadow-2xl" align="end" sideOffset={8}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Notificações</h3>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-[#32d6a5] hover:text-[#32d6a5] hover:bg-[#32d6a5]/10 h-8"
            onClick={() => markAllAsRead()}
          >
            <CheckCheck className="mr-1 h-3 w-3" />
            Marcar tudo como lido
          </Button>
        )}
      </div>

      <ScrollArea className="h-[400px]">
        {notifications.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground text-center p-4">
            <BellOff className="h-10 w-10 mb-2 opacity-50" />
            <p className="text-sm">Nenhuma notificação no momento</p>
          </div>
        ) : (
          <div className="group">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClose={onClose}
              />
            ))}
          </div>
        )}

        {loading && (
          <div className="flex justify-center p-4">
            <Loader2 className="h-5 w-5 animate-spin text-[#32d6a5]" />
          </div>
        )}

        {!loading && hasMore && notifications.length > 0 && (
          <div className="p-2 text-center border-t border-border">
            <Button variant="ghost" size="sm" onClick={handleLoadMore} className="w-full text-xs">
              Carregar mais
            </Button>
          </div>
        )}
      </ScrollArea>
    </PopoverContent>
  );
}
