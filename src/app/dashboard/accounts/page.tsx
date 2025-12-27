"use client";

import { useState } from "react";
import { useAccounts } from "@/hooks/useAccounts";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Wallet, Loader2 } from "lucide-react";
import { AccountCard } from "@/components/accounts/AccountCard";
import { CreateAccountModal } from "@/components/accounts/CreateAccountModal";
import { Account, AccountType } from "@/types/api";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
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

export default function AccountsPage() {
  const { 
    accounts, 
    isLoadingAccounts, 
    summary, 
    isLoadingSummary, 
    deleteAccount,
    isDeletingAccount
  } = useAccounts();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState<Account | null>(null);
  const [accountToDelete, setAccountToDelete] = useState<string | null>(null);

  const handleCreate = () => {
    setAccountToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (account: Account) => {
    setAccountToEdit(account);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (accountToDelete) {
        try {
            await deleteAccount(accountToDelete);
            toast.success("Conta removida com sucesso!");
        } catch (error) {
            toast.error("Erro ao remover conta.");
            console.error(error);
        } finally {
            setAccountToDelete(null);
        }
    }
  };

  if (isLoadingAccounts || isLoadingSummary) {
      return (
          <div className="space-y-6 animate-fade-in-up">
              <div className="flex justify-between items-center">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-10 w-32" />
              </div>
              
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Skeleton className="h-24 w-full rounded-xl col-span-1 md:col-span-4" />
               </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[1,2,3].map(i => <Skeleton key={i} className="h-40 w-full rounded-xl" />)}
              </div>
          </div>
      )
  }

  // Calculate generic summary if API summary is null (fallback)
  const totalBalance = summary?.totalBalance ?? accounts.reduce((acc, curr) => acc + Number(curr.currentBalance || 0), 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#00404f]">Minhas Contas</h1>
        <Button onClick={handleCreate} variant="primary">
          <Plus size={18} className="mr-2" /> Nova Conta
        </Button>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-[#00404f] to-[#005f73] text-white border-none relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        
        <div className="flex items-center gap-4 relative z-10 p-2">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Wallet size={32} className="text-[#7cddb1]" />
            </div>
            <div>
                <p className="text-[#7cddb1] text-sm font-medium mb-1">Saldo Total Consolidado</p>
                <h2 className="text-4xl font-bold">{formatCurrency(totalBalance)}</h2>
            </div>
        </div>
      </Card>

      {/* Accounts Grid */}
      {accounts.length === 0 ? (
          <div className="text-center py-16 bg-white/50 rounded-xl border-dashed border-2 border-[#00404f]/10">
              <div className="w-16 h-16 bg-[#00404f]/5 rounded-full flex items-center justify-center mx-auto mb-4 text-[#00404f]">
                  <Wallet size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#00404f] mb-2">Nenhuma conta encontrada</h3>
              <p className="text-[#00404f]/60 mb-6 max-w-md mx-auto">
                  Cadastre suas contas bancárias, cartões de crédito ou investimentos para começar a controlar suas finanças.
              </p>
              <Button onClick={handleCreate} variant="outline">
                  Criar Primeira Conta
              </Button>
          </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts.map((account) => (
                <AccountCard 
                    key={account.id} 
                    account={account} 
                    onEdit={handleEdit}
                    onDelete={(id) => setAccountToDelete(id)}
                />
            ))}
          </div>
      )}

      {/* Create/Edit Modal */}
      <CreateAccountModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        accountToEdit={accountToEdit}
      />

        {/* Delete Confirmation */}
        <AlertDialog open={!!accountToDelete} onOpenChange={(open) => !open && setAccountToDelete(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
                Esta ação não pode ser desfeita. Isso excluirá permanentemente a conta
                e todas as transações associadas a ela.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700 text-white"
            >
                {isDeletingAccount ? "Excluindo..." : "Sim, excluir conta"}
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>

    </div>
  );
}
