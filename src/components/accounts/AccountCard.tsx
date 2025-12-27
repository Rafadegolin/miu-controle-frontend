import { Account, AccountType } from "@/types/api";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, Landmark, Wallet, TrendingUp, MoreVertical, Edit, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/Button";

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
        <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
            {/* Color Accent */}
            <div 
                className="absolute top-0 left-0 w-1.5 h-full opacity-80"
                style={{ backgroundColor: account.color || "#00404f" }}
            />
            
            <div className="flex justify-between items-start pl-3">
                <div className="flex items-center gap-3">
                    <div 
                        className="p-2.5 rounded-xl text-white shadow-sm"
                        style={{ backgroundColor: account.color || "#00404f" }}
                    >
                        {getAccountIcon(account.type)}
                    </div>
                    <div>
                        <h4 className="font-bold text-[#00404f]">{account.name}</h4>
                        <p className="text-xs text-[#00404f]/60 font-medium">
                            {getAccountTypeLabel(account.type)}
                        </p>
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" className="h-8 w-8 text-[#00404f]/40 hover:text-[#00404f]">
                            <MoreVertical size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(account)} className="cursor-pointer gap-2">
                            <Edit size={14} /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            onClick={() => onDelete(account.id)} 
                            className="cursor-pointer gap-2 text-red-600 focus:text-red-600"
                        >
                            <Trash2 size={14} /> Excluir
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="mt-4 pl-3">
                 <p className="text-[#00404f]/60 text-xs mb-1 uppercase font-bold tracking-wider">Saldo Atual</p>
                 <h3 className={`text-2xl font-bold ${Number(account.currentBalance) < 0 ? 'text-red-500' : 'text-[#00404f]'}`}>
                    {formatCurrency(Number(account.currentBalance))}
                 </h3>
            </div>
            
            {/* Background decoration */}
            <div 
                className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-5 pointer-events-none"
                style={{ backgroundColor: account.color || "#00404f" }}
            />
        </Card>
    );
}
