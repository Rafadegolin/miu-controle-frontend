"use client";

import { useReports } from "@/hooks/useReports";
import { ReportsHeader } from "@/components/reports/ReportsHeader";
import { ReportsKPIs } from "@/components/reports/ReportsKPIs";
import { CategoryChart } from "@/components/reports/CategoryChart";
import { TrendChart } from "@/components/reports/TrendChart";
import { TopTransactions } from "@/components/reports/TopTransactions";
import { InsightsList } from "@/components/reports/InsightsList";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { startOfMonth, endOfMonth } from "date-fns";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState({
    startDate: startOfMonth(new Date()),
    endDate: endOfMonth(new Date()),
  });

  const { data, isLoading, isError } = useReports(dateRange);

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

      <ReportsKPIs data={data.dashboard} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart data={data.monthlyTrend} />
        <CategoryChart data={data.categoryAnalysis} />
      </div>

      <TopTransactions data={data.topTransactions} />
      
      <InsightsList insights={data.insights} />
    </div>
  );
}
