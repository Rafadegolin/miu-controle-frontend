import { BudgetStatusResponse } from "@/types/api";
import { formatCurrency } from "@/lib/utils";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface BudgetCardProps {
  data: BudgetStatusResponse;
}

const DynamicIcon = ({ name, size = 24, className }: { name: string; size?: number, className?: string }) => {
    const Icon = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
    return <Icon size={size} className={className} />;
};

export function BudgetCard({ data }: BudgetCardProps) {
  const { budget, spent, remaining, percentage, status } = data;
  
  let statusColor = "bg-[#32d6a5]";
  let textColor = "text-[#32d6a5]";
  let icon = <CheckCircle size={18} />;
  
  if (status === "WARNING") {
    statusColor = "bg-yellow-500";
    textColor = "text-yellow-500";
    icon = <Info size={18} />;
  } else if (status === "EXCEEDED") {
    statusColor = "bg-red-500";
    textColor = "text-red-500";
    icon = <AlertTriangle size={18} />;
  }

  return (
    <div className="bg-[#0b1215] border border-white/5 rounded-xl p-5 relative overflow-hidden">
      {/* Background Progress Bar */}
      <div 
        className={`absolute bottom-0 left-0 h-1 ${statusColor} transition-all duration-500 ease-out`} 
        style={{ width: `${Math.min(percentage, 100)}%` }} 
      />
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${status === "EXCEEDED" ? 'bg-red-500/10' : 'bg-white/5'}`}>
             {/* Mock icon name since our mock data has hardcoded object */}
             <DynamicIcon name={(budget.category?.icon as any) || "CircleDollarSign"} size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">{budget.category?.name || "Categoria"}</h3>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/5 inline-flex items-center gap-1 ${textColor}`}>
               {icon}
               {status === "OK" ? "Dentro do limite" : status === "WARNING" ? "Alerta" : "Excedido"}
            </span>
          </div>
        </div>
        <div className="text-right">
             <p className="text-sm text-gray-400">Restante</p>
             <p className={`font-bold font-mono ${remaining < 0 ? 'text-red-400' : 'text-white'}`}>
                {formatCurrency(remaining)}
             </p>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
            <p className="text-xs text-gray-500 mb-1">Gasto</p>
            <p className="text-xl font-bold text-white font-mono">{formatCurrency(spent)}</p>
        </div>
        <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">Limite</p>
             <p className="text-sm font-medium text-gray-400 font-mono">{formatCurrency(budget.amount)}</p>
        </div>
      </div>
      
      {/* Percentage Pill */}
      <div className="mt-4 flex justify-between items-center text-xs">
         <span className="text-gray-500 font-medium">
             {percentage.toFixed(1)}% consumido
         </span>
      </div>
    </div>
  );
}
