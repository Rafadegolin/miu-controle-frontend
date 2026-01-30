import { BudgetsSummaryResponse } from "@/types/api";
import { formatCurrency } from "@/lib/utils";
import { Banknote, PieChart, TrendingUp } from "lucide-react";

interface BudgetSummaryCardsProps {
  data: BudgetsSummaryResponse;
}

export function BudgetSummaryCards({ data }: BudgetSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="p-4 rounded-xl bg-linear-to-br from-[#0b1215] to-[#121d21] border border-white/5">
        <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Banknote size={20} />
            </div>
            <span className="text-sm text-gray-400">Total Orçado</span>
        </div>
        <h3 className="text-2xl font-bold text-white">{formatCurrency(data.totalBudgeted)}</h3>
      </div>

      <div className="p-4 rounded-xl bg-linear-to-br from-[#0b1215] to-[#121d21] border border-white/5">
         <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                <PieChart size={20} />
            </div>
            <span className="text-sm text-gray-400">Total Gasto</span>
        </div>
        <h3 className="text-2xl font-bold text-white">{formatCurrency(data.totalSpent)}</h3>
      </div>

       <div className="p-4 rounded-xl bg-linear-to-br from-[#0b1215] to-[#121d21] border border-white/5">
         <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[#32d6a5]/10 text-[#32d6a5]">
                <TrendingUp size={20} />
            </div>
            <span className="text-sm text-gray-400">Saúde Geral</span>
        </div>
        <h3 className={`text-2xl font-bold ${data.overallPercentage > 100 ? 'text-red-400' : 'text-[#32d6a5]'}`}>
            {data.overallPercentage.toFixed(1)}% <span className="text-xs text-gray-500 font-normal">consumido</span>
        </h3>
      </div>
    </div>
  );
}
