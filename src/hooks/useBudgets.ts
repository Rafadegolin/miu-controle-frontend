import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetsActions } from "@/services/budgets.actions";
import type { CreateBudgetDto } from "@/types/api";

export function useBudgets(period?: string) {
  return useQuery({
    queryKey: ["budgets", period],
    queryFn: () => budgetsActions.getBudgets(period),
  });
}

export function useBudgetStatus(id: string) {
  return useQuery({
    queryKey: ["budgets", id, "status"],
    queryFn: () => budgetsActions.getBudgetStatus(id),
    enabled: !!id,
  });
}

export function useCreateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBudgetDto) => budgetsActions.createBudget(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
}

export function useUpdateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateBudgetDto> }) =>
      budgetsActions.updateBudget(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
}

export function useDeleteBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => budgetsActions.deleteBudget(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
}
