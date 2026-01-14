import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { goalsActions } from "@/services/goals.actions";
import type {
  CreateGoalDto,
  AddPurchaseLinkDto,
  ContributeGoalDto,
} from "@/types/api";

export function useGoals(status?: string) {
  return useQuery({
    queryKey: ["goals", status],
    queryFn: () => goalsActions.getGoals(status),
  });
}

export function useGoal(id: string) {
  return useQuery({
    queryKey: ["goals", id],
    queryFn: () => goalsActions.getGoal(id),
    enabled: !!id,
  });
}

export function useGoalsSummary() {
  return useQuery({
    queryKey: ["goals", "summary"],
    queryFn: () => goalsActions.getGoalsSummary(),
  });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGoalDto) => goalsActions.createGoal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
}

export function useUpdateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateGoalDto> }) =>
      goalsActions.updateGoal(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["goals", variables.id] });
    },
  });
}

export function useDeleteGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => goalsActions.deleteGoal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
}

export function useContributeToGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ContributeGoalDto }) =>
      goalsActions.contributeToGoal(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["goals", variables.id] });
    },
  });
}

// 🆕 HOOKS PARA IMAGENS
export function useUploadGoalImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      goalsActions.uploadGoalImage(id, file),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["goals", variables.id] });
    },
  });
}

export function useDeleteGoalImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => goalsActions.deleteGoalImage(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["goals", id] });
    },
  });
}

// 🆕 HOOKS PARA LINKS DE COMPRA
export function useAddPurchaseLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      goalId,
      data,
    }: {
      goalId: string;
      data: AddPurchaseLinkDto;
    }) => goalsActions.addPurchaseLink(goalId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["goals", variables.goalId] });
    },
  });
}

export function useUpdatePurchaseLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      goalId,
      linkId,
      data,
    }: {
      goalId: string;
      linkId: string;
      data: Partial<AddPurchaseLinkDto>;
    }) => goalsActions.updatePurchaseLink(goalId, linkId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["goals", variables.goalId] });
    },
  });
}

export function useDeletePurchaseLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ goalId, linkId }: { goalId: string; linkId: string }) =>
      goalsActions.deletePurchaseLink(goalId, linkId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["goals", variables.goalId] });
    },
  });
}

export function usePurchaseLinksSummary(goalId: string) {
  return useQuery({
    queryKey: ["goals", goalId, "purchase-links-summary"],
    queryFn: () => goalsActions.getPurchaseLinksSummary(goalId),
    enabled: !!goalId,
  });
}
