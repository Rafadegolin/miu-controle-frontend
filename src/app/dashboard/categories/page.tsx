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
import styles from "@/components/dashboard/styles/Dashboard.module.css";

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
              <Loader2 className="animate-spin text-[#32d6a5]" size={48} />
          </div>
      )
  }

  return (
    <div className={styles.scrollableArea}>
      <div className="max-w-7xl mx-auto space-y-8 pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Minhas Categorias</h1>
                <p className="text-gray-400">Gerencie como você classifica suas transações</p>
            </div>
            <button 
                onClick={handleCreate}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#32d6a5] text-[#020809] font-bold hover:bg-[#20bca3] transition-all shadow-lg shadow-[#32d6a5]/20"
            >
                <Plus size={20} /> Nova Categoria
            </button>
        </div>

      <Tabs defaultValue="expense" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8 bg-[#06181b] border border-white/10 p-1 rounded-xl h-auto">
            <TabsTrigger 
                value="expense" 
                className="rounded-lg data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400 text-gray-400 py-2.5 transition-all font-medium"
            >
                Despesas
            </TabsTrigger>
            <TabsTrigger 
                value="income"
                className="rounded-lg data-[state=active]:bg-[#32d6a5]/20 data-[state=active]:text-[#32d6a5] text-gray-400 py-2.5 transition-all font-medium"
            >
                Receitas
            </TabsTrigger>
        </TabsList>

        <TabsContent value="expense" className="space-y-4 data-[state=active]:animate-fade-in">
            <h2 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
                <div className="w-2 h-8 rounded-full bg-red-500"></div>
                Categorias de Despesa
            </h2>
            <CategoryList 
                categories={expenseCategories} 
                onEdit={handleEdit}
                onDelete={setCategoryToDelete}
                isDeleting={isDeletingCategory}
            />
        </TabsContent>

        <TabsContent value="income" className="space-y-4 data-[state=active]:animate-fade-in">
             <h2 className="text-xl font-bold text-[#32d6a5] mb-6 flex items-center gap-2">
                <div className="w-2 h-8 rounded-full bg-[#32d6a5]"></div>
                Categorias de Receita
            </h2>
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
        <AlertDialogContent className="bg-[#06181b] border border-white/10 text-white">
            <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Excluir Categoria?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
                Esta ação excluirá permanentemente a categoria.
                <br/>
                <span className="text-yellow-400 text-xs">Nota: Se houver transações vinculadas, a exclusão pode ser bloqueada pelo sistema.</span>
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white">Cancelar</AlertDialogCancel>
            <AlertDialogAction 
                onClick={handleDeleteConfirm}
                className="bg-red-500 hover:bg-red-600 text-white border-0"
            >
                {isDeletingCategory ? "Excluindo..." : "Sim, excluir"}
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

