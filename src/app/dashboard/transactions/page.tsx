"use client";

import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, subMonths, addMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
    Search, 
    Filter, 
    Plus, 
    ChevronLeft,
    ChevronRight,
    Loader2
} from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TransactionList } from "@/components/transactions/TransactionList";
import { TransactionStats } from "@/components/transactions/TransactionStats";
import { CreateTransactionModal } from "@/components/transactions/CreateTransactionModal";
import { EditTransactionModal } from "@/components/transactions/EditTransactionModal";
import { DeleteTransactionDialog } from "@/components/transactions/DeleteTransactionDialog";
import api from "@/services/api";
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

            setTransactions(transactionsData);
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

    const filteredTransactions = transactions.filter(tx => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
            tx.description.toLowerCase().includes(searchLower) ||
            tx.merchant?.toLowerCase().includes(searchLower) ||
            tx.category?.name.toLowerCase().includes(searchLower)
        );
    });

    return (
        <div className="space-y-6 animate-fade-in-up pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold text-[#00404f]">Transações</h2>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="secondary" className="flex-1 md:flex-none">
                        <Filter size={16} /> Filtros
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex-1 md:flex-none"
                    >
                        <Plus size={16} /> Nova Transação
                    </Button>
                </div>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-[#00404f]/10">
                <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
                    <ChevronLeft size={20} />
                </Button>
                <div className="text-center">
                    <h3 className="text-lg font-bold text-[#00404f] capitalize">
                        {format(currentDate, "MMMM yyyy", { locale: ptBR })}
                    </h3>
                </div>
                <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                    <ChevronRight size={20} />
                </Button>
            </div>

            {/* Stats Section */}
            <TransactionStats stats={stats} isLoading={isLoading} />

            {/* Transactions List Section */}
            <Card className="p-0! overflow-hidden shadow-sm border-[#00404f]/10">
                <div className="border-b border-[#00404f]/10 p-4 bg-[#F8FAFC] flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00404f]/40"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Buscar por descrição, estabelecimento..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#00404f]/10 bg-white focus:border-[#3c88a0] outline-none text-sm transition-colors"
                        />
                    </div>
                    <select 
                        className="px-4 py-2 rounded-lg border border-[#00404f]/10 bg-white text-[#00404f] text-sm outline-none cursor-pointer hover:border-[#3c88a0] transition-colors"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value as TransactionType | "ALL")}
                    >
                        <option value="ALL">Todas as Transações</option>
                        <option value={TransactionType.EXPENSE}>Despesas</option>
                        <option value={TransactionType.INCOME}>Receitas</option>
                    </select>
                </div>

                <TransactionList 
                    transactions={filteredTransactions} 
                    isLoading={isLoading}
                    onEdit={handleEditTransaction}
                    onDelete={handleDeleteTransaction}
                />
            </Card>

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
    );
}
