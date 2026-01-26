import { formatCurrency } from "@/lib/utils";
import { ReportDashboardResponse } from "@/types/api";
import { ArrowDownRight, ArrowUpRight, Wallet, TrendingUp } from "lucide-react";

interface ReportsKPIsProps {
  data: ReportDashboardResponse;
}

export function ReportsKPIs({ data }: ReportsKPIsProps) {
  const { summary, averages } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Saldo */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-2">
          <div className="p-2 rounded-lg bg-[#32d6a5]/10 text-[#32d6a5]">
            <Wallet size={20} />
          </div>
        </div>
        <p className="text-gray-400 text-xs mb-1">Saldo do Período</p>
        <h3 className="text-2xl font-bold text-white mb-2">
          {formatCurrency(summary.balance)}
        </h3>
        <p className="text-xs text-gray-500">
          {summary.transactionCount} transações no total
        </p>
      </div>

      {/* Receitas */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
         <div className="flex justify-between items-start mb-2">
          <div className="p-2 rounded-lg bg-[#32d6a5]/10 text-[#32d6a5]">
            <ArrowUpRight size={20} />
          </div>
        </div>
        <p className="text-gray-400 text-xs mb-1">Receitas</p>
        <h3 className="text-2xl font-bold text-[#32d6a5] mb-2">
          {formatCurrency(summary.totalIncome)}
        </h3>
        <p className="text-xs text-gray-500">
          Média diária: {formatCurrency(averages.avgDailyIncome)}
        </p>
      </div>

      {/* Despesas */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-2">
          <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
            <ArrowDownRight size={20} />
          </div>
        </div>
        <p className="text-gray-400 text-xs mb-1">Despesas</p>
        <h3 className="text-2xl font-bold text-red-400 mb-2">
          {formatCurrency(summary.totalExpense)}
        </h3>
        <p className="text-xs text-gray-500">
          Média diária: {formatCurrency(averages.avgDailyExpense)}
        </p>
      </div>

      {/* Ticket Médio */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-2">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <TrendingUp size={20} />
          </div>
        </div>
        <p className="text-gray-400 text-xs mb-1">Ticket Médio</p>
        <h3 className="text-2xl font-bold text-blue-400 mb-2">
          {formatCurrency(averages.avgTransactionValue)}
        </h3>
         <p className="text-xs text-gray-500">
          Por transação
        </p>
      </div>
    </div>
  );
}
