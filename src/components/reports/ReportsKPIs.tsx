import { formatCurrency } from "@/lib/utils";
import { ReportDashboardResponse, AnalysisInsight } from "@/types/api";
import { ArrowDownRight, ArrowUpRight, Wallet, TrendingUp, ArrowUpCircle, ArrowDownCircle, Target } from "lucide-react";
import { SmartMetricCard } from "@/components/analysis/SmartMetricCard";

interface ReportsKPIsProps {
  data: ReportDashboardResponse;
  insights?: AnalysisInsight[];
}

export function ReportsKPIs({ data, insights = [] }: ReportsKPIsProps) {
  const { summary, averages } = data;

  const getInsight = (metric: string) => insights.find(i => i.relatedMetric === metric);

  // Calculate a mock savings rate for demonstration if not available
  const savingsRate = summary.totalIncome > 0 
    ? ((summary.totalIncome - summary.totalExpense) / summary.totalIncome) * 100 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Saldo */}
      <SmartMetricCard 
        label="Saldo do Período"
        value={summary.balance}
        type="BALANCE"
        colorClass="text-blue-500 bg-blue-500"
        icon={<Wallet size={24} className="text-blue-500" />}
        insight={getInsight('BALANCE')}
      />

      {/* Receitas */}
      <SmartMetricCard 
        label="Receitas"
        value={summary.totalIncome}
        type="INCOME"
        colorClass="text-[#32d6a5] bg-[#32d6a5]"
        icon={<ArrowUpCircle size={24} className="text-[#32d6a5]" />}
        insight={getInsight('INCOME')}
      />

      {/* Despesas */}
      <SmartMetricCard 
        label="Despesas"
        value={summary.totalExpense}
        type="EXPENSE"
        colorClass="text-red-500 bg-red-500"
        icon={<ArrowDownCircle size={24} className="text-red-500" />}
        insight={getInsight('EXPENSE')}
      />

      {/* Taxa de Poupança (Calculated) */}
      <SmartMetricCard 
        label="Taxa de Poupança"
        value={savingsRate}
        type="SAVINGS_RATE"
        isCurrency={false}
        colorClass="text-purple-500 bg-purple-500"
        icon={<Target size={24} className="text-purple-500" />}
        insight={getInsight('SAVINGS_RATE')}
      />
    </div>
  );
}
