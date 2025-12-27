import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { CreateCategoryDto } from "@/types/api";

export function useCategories(type?: string) {
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: ["categories", { type }],
    queryFn: () => api.getCategories(type),
  });

  const categoriesTreeQuery = useQuery({
    queryKey: ["categories-tree"],
    queryFn: () => api.getCategoriesTree(),
  });

  const createCategoryMutation = useMutation({
    mutationFn: (data: CreateCategoryDto) => api.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories-tree"] });
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateCategoryDto> }) =>
      api.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories-tree"] });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => api.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories-tree"] });
    },
  });

  return {
    categories: categoriesQuery.data || [],
    isLoadingCategories: categoriesQuery.isLoading,
    isErrorCategories: categoriesQuery.isError,
    
    categoriesTree: categoriesTreeQuery.data || [],
    isLoadingTree: categoriesTreeQuery.isLoading,

    createCategory: createCategoryMutation.mutateAsync,
    isCreatingCategory: createCategoryMutation.isPending,

    updateCategory: updateCategoryMutation.mutateAsync,
    isUpdatingCategory: updateCategoryMutation.isPending,

    deleteCategory: deleteCategoryMutation.mutateAsync,
    isDeletingCategory: deleteCategoryMutation.isPending,
  };
}
