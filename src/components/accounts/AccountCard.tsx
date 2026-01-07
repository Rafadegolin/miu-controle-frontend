import { Account, AccountType } from "@/types/api";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, Landmark, Wallet, TrendingUp, MoreVertical, Edit, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AccountCardProps {
    account: Account;
    onEdit: (account: Account) => void;
    onDelete: (id: string) => void;
}

const getAccountIcon = (type: AccountType) => {
    switch (type) {
        case AccountType.CHECKING:
            return <Landmark size={20} />;
        case AccountType.CREDIT_CARD:
            return <CreditCard size={20} />;
        case AccountType.INVESTMENT:
            return <TrendingUp size={20} />;
        case AccountType.SAVINGS:
        default:
            return <Wallet size={20} />;
    }
};

const getAccountTypeLabel = (type: AccountType) => {
    switch (type) {
        case AccountType.CHECKING:
            return "Conta Corrente";
        case AccountType.CREDIT_CARD:
            return "Cartão de Crédito";
        case AccountType.INVESTMENT:
            return "Investimento";
        case AccountType.SAVINGS:
            return "Poupança";
        default:
            return type;
    }
};

export function AccountCard({ account, onEdit, onDelete }: AccountCardProps) {
    return (
        <div className="relative overflow-hidden group hover:translate-y-[-4px] transition-all duration-300 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            {/* Color Accent Indicator */}
            <div 
                className="absolute top-0 left-0 w-1.5 h-full opacity-60 group-hover:opacity-100 transition-opacity settings-color-bar"
                style={{ backgroundColor: account.color || "#32d6a5" }}
            />
            
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div 
                            className="p-3 rounded-xl text-white shadow-lg bg-white/10"
                            style={{ 
                                backgroundColor: account.color ? `${account.color}20` : '#32d6a520', 
                                color: account.color || '#32d6a5' 
                            }}
                        >
                            {getAccountIcon(account.type)}
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-white group-hover:text-[#32d6a5] transition-colors">
                                {account.name}
                            </h4>
                            <p className="text-xs text-gray-400 font-medium">
                                {getAccountTypeLabel(account.type)}
                            </p>
                        </div>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none">
                                <MoreVertical size={16} />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#06181b] border border-white/10 text-white shadow-xl">
                            <DropdownMenuItem onClick={() => onEdit(account)} className="cursor-pointer gap-2 focus:bg-white/10 focus:text-white">
                                <Edit size={14} /> Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                onClick={() => onDelete(account.id)} 
                                className="cursor-pointer gap-2 text-red-400 focus:text-red-400 focus:bg-red-400/10"
                            >
                                <Trash2 size={14} /> Excluir
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="mt-6">
                     <p className="text-gray-500 text-xs mb-1 uppercase font-bold tracking-wider">Saldo Atual</p>
                     <h3 className={`text-2xl font-bold ${Number(account.currentBalance) < 0 ? 'text-red-400' : 'text-white'}`}>
                        {formatCurrency(Number(account.currentBalance))}
                     </h3>
                </div>
            </div>
            
            {/* Background decoration */}
            <div 
                className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full opacity-5 pointer-events-none blur-2xl"
                style={{ backgroundColor: account.color || "#32d6a5" }}
            />
        </div>
    );
}
