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
    ArrowUpCircle,
    ArrowDownCircle,
    Calendar,
    CreditCard,
    Edit2,
    Trash2
} from "lucide-react";
import { Transaction, TransactionType } from "@/types/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

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
                    <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-lg" />
                ))}
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <div className="flex justify-center mb-4">
                    <div className="bg-gray-100 p-4 rounded-full">
                        <FileText size={40} className="text-gray-400" />
                    </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Nenhuma transação encontrada</h3>
                <p className="mt-1 text-sm">Tente ajustar seus filtros ou adicione uma nova transação.</p>
            </div>
        );
    }

    return (
        <Card className="p-0! overflow-hidden shadow-sm border-[#00404f]/10">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[#F8FAFC] text-[#00404f]/60 font-semibold border-b border-[#00404f]/10">
                        <tr>
                            <th className="px-6 py-4">Descrição</th>
                            <th className="px-6 py-4">Categoria</th>
                            <th className="px-6 py-4">Conta</th>
                            <th className="px-6 py-4">Data</th>
                            <th className="px-6 py-4 text-right">Valor</th>
                            <th className="px-6 py-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#00404f]/5">
                        {transactions.map((tx) => {
                            const Icon = getIcon(tx.category?.icon);
                            const isExpense = tx.type === TransactionType.EXPENSE;
                            const amountColor = isExpense ? "text-[#00404f]" : "text-[#007459]";
                            const sign = isExpense ? "-" : "+";

                            return (
                                <tr 
                                    key={tx.id} 
                                    className="hover:bg-[#F8FAFC]/50 transition-colors group cursor-default"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div 
                                                className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm flex-shrink-0"
                                                style={{ backgroundColor: tx.category?.color || "#94a3b8" }}
                                            >
                                                <Icon size={20} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#00404f]">{tx.description}</span>
                                                {tx.merchant && (
                                                    <span className="text-xs text-gray-500">{tx.merchant}</span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-full bg-[#00404f]/5 text-[#00404f] text-xs font-medium border border-[#00404f]/10">
                                            {tx.category?.name || "Sem Categoria"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <CreditCard size={14} className="opacity-50" />
                                            <span>{tx.account?.name || "Conta Excluída"}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[#00404f]/60">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="opacity-50" />
                                            {format(new Date(tx.date), "dd MMM, yyyy", { locale: ptBR })}
                                        </div>
                                    </td>
                                    <td className={`px-6 py-4 text-right font-bold text-base ${amountColor}`}>
                                        {sign} {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Math.abs(tx.amount))}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon-sm"
                                                onClick={() => onEdit?.(tx)}
                                                className="hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                <Edit2 size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon-sm"
                                                onClick={() => onDelete?.(tx.id)}
                                                className="hover:bg-red-50 hover:text-red-600"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
