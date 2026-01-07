"use client";

import { useState } from "react";
import { useAccounts } from "@/hooks/useAccounts";
import { Plus, Wallet, Loader2 } from "lucide-react";
import { AccountCard } from "@/components/accounts/AccountCard";
import { CreateAccountModal } from "@/components/accounts/CreateAccountModal";
import { Account } from "@/types/api";
import { formatCurrency } from "@/lib/utils";
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
import { motion, AnimatePresence } from "framer-motion";

import styles from "@/components/dashboard/styles/Dashboard.module.css";

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

  // Calculate generic summary if API summary is null (fallback)
  const totalBalance = summary?.totalBalance ?? accounts.reduce((acc, curr) => acc + Number(curr.currentBalance || 0), 0);
  const isLoading = isLoadingAccounts || isLoadingSummary;

  return (
    <div className={styles.scrollableArea}>
      <div className="max-w-7xl mx-auto space-y-8 pb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Minhas Contas Bancárias</h1>
                <p className="text-gray-400">Gerencie seus saldos e cartões</p>
            </div>
            <button 
                onClick={handleCreate}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#32d6a5] text-[#020809] font-bold hover:bg-[#20bca3] transition-all shadow-lg shadow-[#32d6a5]/20"
            >
                <Plus size={20} /> Nova Conta
            </button>
        </div>

        {/* Loading State or Content */}
        {isLoading ? (
             <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-[#32d6a5]" size={40} />
             </div>
        ) : (
            <>
                {/* Summary Card */}
                <div className="p-6 rounded-2xl bg-linear-to-br from-[#06181b] to-[#0a272b] border border-white/10 relative overflow-hidden backdrop-blur-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#32d6a5]/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                    
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="p-4 bg-[#32d6a5]/20 rounded-2xl backdrop-blur-sm border border-[#32d6a5]/10">
                            <Wallet size={32} className="text-[#32d6a5]" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm font-medium mb-1">Saldo Total Consolidado</p>
                            <h2 className="text-4xl font-bold text-white tracking-tight">
                                {formatCurrency(totalBalance)}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Accounts Grid */}
                <AnimatePresence mode="wait">
                    {accounts.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16 bg-white/5 rounded-2xl border border-white/10"
                        >
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-[#32d6a5]">
                                <Wallet size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Nenhuma conta encontrada</h3>
                            <p className="text-gray-400 mb-6 max-w-md mx-auto">
                                Cadastre suas contas bancárias, cartões de crédito ou investimentos para começar a controlar suas finanças.
                            </p>
                            <button 
                                onClick={handleCreate}
                                className="px-6 py-2 rounded-xl border border-[#32d6a5] text-[#32d6a5] hover:bg-[#32d6a5]/10 transition-colors font-medium"
                            >
                                Criar Primeira Conta
                            </button>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {accounts.map((account, index) => (
                                <motion.div
                                    key={account.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <AccountCard 
                                        account={account} 
                                        onEdit={handleEdit}
                                        onDelete={(id) => setAccountToDelete(id)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </>
        )}

        {/* Create/Edit Modal */}
        <CreateAccountModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            accountToEdit={accountToEdit}
        />

        {/* Delete Confirmation */}
        <AlertDialog open={!!accountToDelete} onOpenChange={(open) => !open && setAccountToDelete(null)}>
            <AlertDialogContent className="bg-[#06181b] border border-white/10 text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Excluir Conta?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                        Esta ação não pode ser desfeita. Isso excluirá permanentemente a conta
                        e <span className="text-red-400 font-bold">todas as transações</span> associadas a ela.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel 
                        className="bg-transparent border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white"
                    >
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={handleDeleteConfirm}
                        className="bg-red-500 hover:bg-red-600 text-white border-0"
                    >
                        {isDeletingAccount ? "Excluindo..." : "Sim, excluir conta"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
