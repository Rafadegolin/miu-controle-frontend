import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { recurringActions } from "@/services/recurring.actions";
import type { CreateRecurringTransactionDto } from "@/types/api";

export function useRecurringTransactions(isActive?: boolean) {
  return useQuery({
    queryKey: ["recurring-transactions", isActive],
    queryFn: () => recurringActions.getRecurringTransactions(isActive),
  });
}

export function useCreateRecurringTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRecurringTransactionDto) =>
      recurringActions.createRecurringTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurring-transactions"] });
    },
  });
}

export function useUpdateRecurringTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateRecurringTransactionDto>;
    }) => recurringActions.updateRecurringTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurring-transactions"] });
    },
  });
}

export function useDeleteRecurringTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => recurringActions.deleteRecurringTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurring-transactions"] });
    },
  });
}

export function useToggleRecurringTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => recurringActions.toggleRecurringTransaction(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["recurring-transactions"] });
    },
  });
}

export function useProcessRecurringTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => recurringActions.processRecurringTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurring-transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] }); // Update transactions list too
      queryClient.invalidateQueries({ queryKey: ["summary"] }); // Update balance
    },
  });
}
