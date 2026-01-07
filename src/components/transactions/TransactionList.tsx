import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
    ShoppingCart, 
    Utensils, 
    Car, 
    Play, 
    Banknote, 
    Home, 
    FileText, 
    Smartphone, 
    AlertCircle,
    Calendar,
    CreditCard,
    Edit2,
    Trash2
} from "lucide-react";
import { Transaction, TransactionType } from "@/types/api";
import styles from "@/components/dashboard/styles/Dashboard.module.css";
import { formatCurrency } from "@/lib/utils";

interface TransactionListProps {
    transactions: Transaction[];
    isLoading: boolean;
    onEdit?: (transaction: Transaction) => void;
    onDelete?: (id: string) => void;
}

// Map common category names/icons - Ideally this should be dynamic based on category.icon but for fallback we use this
const getIcon = (iconName?: string) => {
    switch (iconName) {
        case "🍽️": return Utensils;
        case "🚗": return Car;
        case "🎮": return Play;
        case "💰": return Banknote;
        case "🏠": return Home;
        case "📄": return FileText;
        case "📱": return Smartphone;
        case "🛍️": return ShoppingCart;
        default: return AlertCircle;
    }
};

export function TransactionList({ transactions, isLoading, onEdit, onDelete }: TransactionListProps) {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-white/5 animate-pulse rounded-2xl" />
                ))}
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className={`${styles.glassCard} text-center py-12 text-gray-500`}>
                <div className="flex justify-center mb-4">
                    <div className="bg-white/5 p-4 rounded-full">
                        <FileText size={40} className="text-gray-400" />
                    </div>
                </div>
                <h3 className="text-lg font-medium text-white">Nenhuma transação encontrada</h3>
                <p className="mt-1 text-sm text-gray-400">Tente ajustar seus filtros ou adicione uma nova transação.</p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-gray-400 font-semibold border-b border-[rgba(255,255,255,0.08)]">
                        <tr>
                            <th className="px-6 py-4">Descrição</th>
                            <th className="px-6 py-4">Categoria</th>
                            <th className="px-6 py-4">Conta</th>
                            <th className="px-6 py-4">Data</th>
                            <th className="px-6 py-4 text-right">Valor</th>
                            <th className="px-6 py-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                        {transactions.map((tx) => {
                            const Icon = getIcon(tx.category?.icon);
                            const isExpense = tx.type === TransactionType.EXPENSE;
                            const amountColor = isExpense ? "text-white" : "text-[#32d6a5]";
                            const sign = isExpense ? "-" : "+";

                            return (
                                <tr 
                                    key={tx.id} 
                                    className="hover:bg-white/5 transition-colors group cursor-default"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div 
                                                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0"
                                                style={{ backgroundColor: tx.category?.color || "#94a3b8" }}
                                            >
                                                <Icon size={20} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-white">{tx.description}</span>
                                                {tx.merchant && (
                                                    <span className="text-xs text-gray-400">{tx.merchant}</span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-full bg-white/5 text-gray-300 text-xs font-medium border border-white/10">
                                            {tx.category?.name || "Sem Categoria"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <CreditCard size={14} className="opacity-70" />
                                            <span>{tx.account?.name || "Conta Excluída"}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="opacity-70" />
                                            {format(new Date(tx.date), "dd MMM, yyyy", { locale: ptBR })}
                                        </div>
                                    </td>
                                    <td className={`px-6 py-4 text-right font-bold text-base ${amountColor}`}>
                                        {sign} {formatCurrency(Math.abs(tx.amount))}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => onEdit?.(tx)}
                                                className="cursor-pointer p-2 rounded-lg hover:bg-[#32d6a5]/10 text-gray-400 hover:text-[#32d6a5] transition-colors"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => onDelete?.(tx.id)}
                                                className="cursor-pointer p-2 rounded-lg hover:bg-red-400/10 text-gray-400 hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
