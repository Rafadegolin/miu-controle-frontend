"use client";

import { useReports } from "@/hooks/useReports";
import { ReportsHeader } from "@/components/reports/ReportsHeader";
import { ReportsKPIs } from "@/components/reports/ReportsKPIs";
import { CategoryChart } from "@/components/reports/CategoryChart";
import { TrendChart } from "@/components/reports/TrendChart";
import { TopTransactions } from "@/components/reports/TopTransactions";
import { InsightsList } from "@/components/reports/InsightsList";
import { Loader2, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { getMonthlyReport } from "@/services/analysis.actions";
import { MonthlyReport } from "@/types/api";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState({
    startDate: startOfMonth(new Date()),
    endDate: endOfMonth(new Date()),
  });

  const { data, isLoading, isError } = useReports(dateRange);
  const [analysisReport, setAnalysisReport] = useState<MonthlyReport | null>(null);

  useEffect(() => {
    async function loadAnalysis() {
        // In a real app we'd pass the actual month
        const rep = await getMonthlyReport(format(dateRange.startDate, "yyyy-MM"));
        setAnalysisReport(rep);
    }
    loadAnalysis();
  }, [dateRange]);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#32d6a5]" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center text-center">
        <h3 className="text-xl font-bold text-white mb-2">Erro ao carregar relatórios</h3>
        <p className="text-gray-400">Não foi possível buscar os dados. Tente novamente mais tarde.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up pb-10">
      <ReportsHeader 
        startDate={dateRange.startDate} 
        endDate={dateRange.endDate} 
        onDateChange={({ from, to }) => setDateRange({ startDate: from, endDate: to })} 
      />

      <ReportsKPIs data={data.dashboard} insights={analysisReport?.insights} />

      {analysisReport?.anomalies && analysisReport.anomalies.length > 0 && (
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
            <h4 className="text-sm font-bold text-red-400 mb-3 flex items-center gap-2">
                <AlertTriangle size={16} /> Anomalias Detectadas
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {analysisReport.anomalies.map((anom, i) => (
                    <div key={i} className="bg-red-500/10 p-3 rounded-lg text-xs border border-red-500/10">
                        <p className="text-red-300 font-bold mb-1">{anom.categoryName}</p>
                        <p className="text-red-400/80">
                            Gasto de R$ {anom.amount} está <strong className="underline">{anom.deviationPercentage}%</strong> acima da média.
                        </p>
                    </div>
                ))}
            </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart data={data.monthlyTrend} />
        <CategoryChart data={data.categoryAnalysis} />
      </div>

      <TopTransactions data={data.topTransactions} />
      
      <InsightsList insights={data.insights} />
    </div>
  );
}
