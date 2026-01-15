"use client";

import { useEffect } from "react";
import { useSocket } from "@/contexts/SocketContext";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RefreshCcw } from "lucide-react";

export function SyncListener() {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const onSyncTransactions = (data?: any) => {
      console.log("🔄 SYNC EVENT: Transactions updated externally", data);
      
      // Invalidate queries to force refetch
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });

      toast("Dados atualizados", {
        description: "Novas transações detectadas.",
        icon: <RefreshCcw size={16} className="animate-spin" />,
        duration: 2000,
      });
    };

    const onNotification = (data: { title: string; message: string }) => {
        console.log("🔔 NOTIFICATION EVENT:", data);
        toast(data.title, {
            description: data.message,
        });
        // Refresh notifications list
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
    };

    socket.on("sync:transactions", onSyncTransactions);
    socket.on("notification", onNotification);

    return () => {
      socket.off("sync:transactions", onSyncTransactions);
      socket.off("notification", onNotification);
    };
  }, [socket, queryClient]);

  return null; // This component handles logic only, no UI
}
