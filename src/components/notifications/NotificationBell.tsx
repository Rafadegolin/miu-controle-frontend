import { Bell } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNotifications } from "@/contexts/NotificationsContext";
import { NotificationList } from "./NotificationList";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function NotificationBell() {
  const { unreadCount } = useNotifications();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-10 w-10 text-muted-foreground hover:text-white rounded-full bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all duration-300">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 hover:bg-red-600 border-none text-[10px]"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notificações</span>
        </Button>
      </PopoverTrigger>
      <NotificationList />
    </Popover>
  );
}
