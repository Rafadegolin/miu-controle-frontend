import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBudgets,
  getBudgetStatus,
  createBudget,
  updateBudget,
  deleteBudget,
} from "@/services/budgets.actions";
import type { CreateBudgetDto } from "@/types/api";

export function useBudgets(period?: string) {
  return useQuery({
    queryKey: ["budgets", period],
    queryFn: () => getBudgets(period),
  });
}

export function useBudgetStatus(id: string) {
  return useQuery({
    queryKey: ["budgets", id, "status"],
    queryFn: () => getBudgetStatus(id),
    enabled: !!id,
  });
}

export function useCreateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBudgetDto) => createBudget(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
}

export function useUpdateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateBudgetDto>;
    }) => updateBudget(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
}

export function useDeleteBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBudget(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
}
