"use client";

import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, subMonths, addMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { 
    Search, 
    Filter, 
    Plus, 
    ChevronLeft,
    ChevronRight,
    Loader2
} from "lucide-react";

import styles from "@/components/dashboard/styles/Dashboard.module.css";

import { Button } from "@/components/ui/Button";
import { TransactionList } from "@/components/transactions/TransactionList";
import { TransactionStats } from "@/components/transactions/TransactionStats";
import { CreateTransactionModal } from "@/components/transactions/CreateTransactionModal";
import { EditTransactionModal } from "@/components/transactions/EditTransactionModal";
import { DeleteTransactionDialog } from "@/components/transactions/DeleteTransactionDialog";
import api from "@/services/api";
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Transaction, TransactionStatsMonthly, TransactionType } from "@/types/api";

export default function TransactionsPage() {
    // States
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [stats, setStats] = useState<TransactionStatsMonthly | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    
    // Filters
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState<TransactionType | "ALL">("ALL");

    useEffect(() => {
        loadData();
    }, [currentDate, typeFilter]);

    const loadData = async () => {
        setIsLoading(true);
        try {
            // Get Month Dates
            const startDate = format(startOfMonth(currentDate), "yyyy-MM-dd");
            const endDate = format(endOfMonth(currentDate), "yyyy-MM-dd");
            const monthStr = format(currentDate, "yyyy-MM-dd"); // Param for stats

            const [transactionsData, statsData] = await Promise.all([
                api.getTransactions({
                    startDate,
                    endDate,
                    type: typeFilter === "ALL" ? undefined : typeFilter,
                }),
                api.getMonthlyStats({ month: monthStr })
            ]);

            if (Array.isArray(transactionsData)) {
                setTransactions(transactionsData);
            } else if ((transactionsData as any)?.data && Array.isArray((transactionsData as any).data)) {
                // Determine if response is paginated/wrapped
                setTransactions((transactionsData as any).data);
            } else {
                console.error("Invalid transactions data format:", transactionsData);
                setTransactions([]);
            }
            setStats(statsData);
        } catch (error) {
            console.error("Failed to load transactions data", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateSuccess = () => {
        loadData();
    };

    const handleEditTransaction = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setIsEditModalOpen(true);
    };

    const handleDeleteTransaction = (id: string) => {
        const transaction = transactions.find(t => t.id === id);
        if (transaction) {
            setSelectedTransaction(transaction);
            setIsDeleteDialogOpen(true);
        }
    };

    const handleConfirmDelete = async () => {
        if (!selectedTransaction) return;
        
        setIsDeleting(true);
        try {
            await api.deleteTransaction(selectedTransaction.id);
            setIsDeleteDialogOpen(false);
            setSelectedTransaction(null);
            loadData();
        } catch (error) {
            console.error("Failed to delete transaction", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handlePreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    const filteredTransactions = (Array.isArray(transactions) ? transactions : []).filter(tx => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
            tx.description.toLowerCase().includes(searchLower) ||
            tx.merchant?.toLowerCase().includes(searchLower) ||
            tx.category?.name.toLowerCase().includes(searchLower)
        );
    });

    return (
        <div className={styles.scrollableArea}>
             <div className="max-w-6xl mx-auto space-y-8 pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-1">Transações</h2>
                        <p className="text-gray-400">Gerencie suas entradas e saídas.</p>
                    </div>
                    
                    <div className="flex gap-3 w-full md:w-auto">
                        
                        <button 
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#32d6a5] text-[#020809] font-bold hover:bg-[#20bca3] transition-all shadow-lg shadow-[#32d6a5]/20"
                        >
                            <Plus size={18} /> 
                            <span>Nova Transação</span>
                        </button>
                    </div>
                </div>

                {/* Month Navigation */}
                <div className="flex items-center justify-between bg-white/5 p-2 rounded-2xl border border-white/10 w-full md:w-fit mx-auto md:mx-0">
                    <button 
                        onClick={handlePreviousMonth}
                        className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div className="px-6 text-center">
                        <h3 className="text-lg font-bold text-white capitalize">
                            {format(currentDate, "MMMM yyyy", { locale: ptBR })}
                        </h3>
                    </div>
                    <button 
                        onClick={handleNextMonth}
                        className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Stats Section with Smooth Transition */}
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading-stats"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                             <TransactionStats stats={null} isLoading={true} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content-stats"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TransactionStats stats={stats} isLoading={false} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Transactions List Section with Smooth Transition */}
                <AnimatePresence mode="wait">
                    {isLoading ? (
                         <motion.div
                            key="loading-list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <TransactionList 
                                transactions={[]} 
                                isLoading={true}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content-list"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                                <div className="relative w-full md:w-96">
                                    <Search
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                        size={18}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Buscar transação..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-gray-600 focus:border-[#32d6a5]/50 outline-none transition-all"
                                    />
                                </div>
                                <div className="w-full md:w-auto">
                                    <Select
                                        value={typeFilter}
                                        onValueChange={(value) => setTypeFilter(value as TransactionType | "ALL")}
                                    >
                                        <SelectTrigger className="w-full md:w-[180px] h-[50px] rounded-xl border border-white/10 bg-[#06181b] text-white focus:ring-[#32d6a5]/50 focus:ring-1">
                                            <SelectValue placeholder="Tipo" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#06181b] border border-white/10 text-white">
                                            <SelectItem value="ALL" className="focus:bg-white/10 focus:text-white cursor-pointer">
                                                Todas
                                            </SelectItem>
                                            <SelectItem value={TransactionType.EXPENSE} className="focus:bg-white/10 focus:text-white cursor-pointer">
                                                Despesas
                                            </SelectItem>
                                            <SelectItem value={TransactionType.INCOME} className="focus:bg-white/10 focus:text-white cursor-pointer">
                                                Receitas
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <TransactionList 
                                transactions={filteredTransactions} 
                                isLoading={false}
                                onEdit={handleEditTransaction}
                                onDelete={handleDeleteTransaction}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <CreateTransactionModal 
                    isOpen={isCreateModalOpen} 
                    onClose={() => setIsCreateModalOpen(false)} 
                    onSuccess={handleCreateSuccess}
                />

                <EditTransactionModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedTransaction(null);
                    }}
                    onSuccess={handleCreateSuccess}
                    transaction={selectedTransaction}
                />

                <DeleteTransactionDialog
                    isOpen={isDeleteDialogOpen}
                    onClose={() => {
                        setIsDeleteDialogOpen(false);
                        setSelectedTransaction(null);
                    }}
                    onConfirm={handleConfirmDelete}
                    transaction={selectedTransaction}
                    isDeleting={isDeleting}
                />
            </div>
        </div>
    );
}
