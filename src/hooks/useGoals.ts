import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import type {
  Goal,
  CreateGoalDto,
  AddPurchaseLinkDto,
  ContributeGoalDto,
} from "@/types/api";

export function useGoals(status?: string) {
  return useQuery({
    queryKey: ["goals", status],
    queryFn: () => api.getGoals(status),
  });
}

export function useGoal(id: string) {
  return useQuery({
    queryKey: ["goals", id],
    queryFn: () => api.getGoal(id),
    enabled: !!id,
  });
}

export function useGoalsSummary() {
  return useQuery({
    queryKey: ["goals", "summary"],
    queryFn: () => api.getGoalsSummary(),
  });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGoalDto) => api.createGoal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
}

export function useUpdateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateGoalDto> }) =>
      api.updateGoal(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["goals", variables.id] });
    },
  });
}

export function useDeleteGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.deleteGoal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
}

export function useContributeToGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ContributeGoalDto }) =>
      api.contributeToGoal(id, data),
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
      api.uploadGoalImage(id, file),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["goals", variables.id] });
    },
  });
}

export function useDeleteGoalImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.deleteGoalImage(id),
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
    }) => api.addPurchaseLink(goalId, data),
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
    }) => api.updatePurchaseLink(goalId, linkId, data),
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
      api.deletePurchaseLink(goalId, linkId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["goals", variables.goalId] });
    },
  });
}

export function usePurchaseLinksSummary(goalId: string) {
  return useQuery({
    queryKey: ["goals", goalId, "purchase-links-summary"],
    queryFn: () => api.getPurchaseLinksSummary(goalId),
    enabled: !!goalId,
  });
}
