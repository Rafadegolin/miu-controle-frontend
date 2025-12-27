"use client";

import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Loader2 } from "lucide-react";
import { CreateCategoryModal } from "@/components/categories/CreateCategoryModal";
import { CategoryList } from "@/components/categories/CategoryList";
import { CategoryType, Category } from "@/types/api";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function CategoriesPage() {
  const { 
    categories, 
    isLoadingCategories, 
    deleteCategory,
    isDeletingCategory
  } = useCategories();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  const handleEdit = (category: Category) => {
    setCategoryToEdit(category);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setCategoryToEdit(null);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (categoryToDelete) {
        try {
            await deleteCategory(categoryToDelete);
            toast.success("Categoria removida com sucesso!");
        } catch (error) {
            toast.error("Erro ao remover categoria. Verifique se existem transações vinculadas.");
            console.error(error);
        } finally {
            setCategoryToDelete(null);
        }
    }
  };

  const incomeCategories = categories.filter(c => c.type === CategoryType.INCOME);
  const expenseCategories = categories.filter(c => c.type === CategoryType.EXPENSE);

  if (isLoadingCategories) {
      return (
          <div className="flex items-center justify-center h-96">
              <Loader2 className="animate-spin text-[#00404f]" size={48} />
          </div>
      )
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#00404f]">Minhas Categorias</h1>
        <Button onClick={handleCreate} variant="primary">
          <Plus size={18} className="mr-2" /> Nova Categoria
        </Button>
      </div>

      <Tabs defaultValue="expense" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="expense">Despesas</TabsTrigger>
            <TabsTrigger value="income">Receitas</TabsTrigger>
        </TabsList>

        <TabsContent value="expense" className="space-y-4">
            <h2 className="text-xl font-semibold text-[#00404f] mb-4">Categorias de Despesa</h2>
            <CategoryList 
                categories={expenseCategories} 
                onEdit={handleEdit}
                onDelete={setCategoryToDelete}
                isDeleting={isDeletingCategory}
            />
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
            <h2 className="text-xl font-semibold text-[#00404f] mb-4">Categorias de Receita</h2>
            <CategoryList 
                categories={incomeCategories} 
                onEdit={handleEdit}
                onDelete={setCategoryToDelete}
                isDeleting={isDeletingCategory}
            />
        </TabsContent>
      </Tabs>

      <CreateCategoryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={categoryToEdit}
      />

       <AlertDialog open={!!categoryToDelete} onOpenChange={(open) => !open && setCategoryToDelete(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
                Esta ação excluirá permanentemente a categoria.
                Se houver transações vinculadas, a exclusão pode ser bloqueada.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700 text-white"
            >
                {isDeletingCategory ? "Excluindo..." : "Sim, excluir"}
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}
