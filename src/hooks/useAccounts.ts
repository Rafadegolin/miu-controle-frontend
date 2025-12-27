import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { CreateAccountDto, AccountFilters } from "@/types/api";

export function useAccounts(activeOnly: boolean = true) {
  const queryClient = useQueryClient();

  const accountsQuery = useQuery({
    queryKey: ["accounts", { activeOnly }],
    queryFn: () => api.getAccounts(activeOnly),
  });

  const accountsSummaryQuery = useQuery({
    queryKey: ["accounts-summary"],
    queryFn: () => api.getAccountsSummary(),
  });

  const createAccountMutation = useMutation({
    mutationFn: (data: CreateAccountDto) => api.createAccount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["accounts-summary"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-home"] });
    },
  });

  const updateAccountMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateAccountDto> }) =>
      api.updateAccount(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["accounts-summary"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-home"] });
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: (id: string) => api.deleteAccount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["accounts-summary"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-home"] });
    },
  });

  return {
    accounts: accountsQuery.data || [],
    isLoadingAccounts: accountsQuery.isLoading,
    isErrorAccounts: accountsQuery.isError,
    refetchAccounts: accountsQuery.refetch,

    summary: accountsSummaryQuery.data,
    isLoadingSummary: accountsSummaryQuery.isLoading,

    createAccount: createAccountMutation.mutateAsync,
    isCreatingAccount: createAccountMutation.isPending,

    updateAccount: updateAccountMutation.mutateAsync,
    isUpdatingAccount: updateAccountMutation.isPending,

    deleteAccount: deleteAccountMutation.mutateAsync,
    isDeletingAccount: deleteAccountMutation.isPending,
  };
}
