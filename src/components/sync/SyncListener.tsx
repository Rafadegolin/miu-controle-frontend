"use client";

import { useEffect } from "react";
import { useSocket } from "@/contexts/SocketContext";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Nomes de eventos conforme docs/handoff/README.md (WS_EVENTS).
export function SyncListener() {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const invalidateTransactions = () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    };

    const onBalanceUpdated = () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    };

    const onBudgetAlert = (data?: { title?: string; message?: string }) => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.warning(data?.title ?? "Alerta de orçamento", {
        description: data?.message,
      });
    };

    const onGoalMilestone = (data?: { title?: string; message?: string }) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success(data?.title ?? "Sua meta atingiu um marco!", {
        description: data?.message,
      });
    };

    socket.on("transaction.created", invalidateTransactions);
    socket.on("transaction.updated", invalidateTransactions);
    socket.on("transaction.deleted", invalidateTransactions);
    socket.on("balance.updated", onBalanceUpdated);
    socket.on("budget.alert", onBudgetAlert);
    socket.on("goal.milestone", onGoalMilestone);

    return () => {
      socket.off("transaction.created", invalidateTransactions);
      socket.off("transaction.updated", invalidateTransactions);
      socket.off("transaction.deleted", invalidateTransactions);
      socket.off("balance.updated", onBalanceUpdated);
      socket.off("budget.alert", onBudgetAlert);
      socket.off("goal.milestone", onGoalMilestone);
    };
  }, [socket, queryClient]);

  return null;
}
