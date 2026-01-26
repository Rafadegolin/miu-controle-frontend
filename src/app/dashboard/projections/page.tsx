"use client";

import { useState } from "react";
import { useProjections } from "@/hooks/useProjections";
import { CashFlowChart } from "@/components/projections/CashFlowChart";
import { TrendingUp, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import styles from "@/components/dashboard/styles/Dashboard.module.css";
import { Loader2 } from "lucide-react";

export default function ProjectionsPage() {
  const [months, setMonths] = useState(6);
  const { data: projections, isLoading } = useProjections(months);

  const lastMonth = projections?.[projections.length - 1];
  
  // Calculate Growth
  const startBalance = projections?.[0]?.balance.accumulated || 0;
  const endBalance = lastMonth?.balance.accumulated || 0;
  const growth = endBalance - startBalance;
  const isPositive = growth >= 0;

  return (
    <div className={styles.scrollableArea}>
      <div className="max-w-5xl mx-auto space-y-8 pb-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                    <TrendingUp size={24} />
                </div>
                <h2 className="text-3xl font-bold text-white">Projeção de Fluxo de Caixa</h2>
            </div>
            <p className="text-gray-400">
                Visualize o futuro das suas finanças com base em seus padrões de consumo e renda.
            </p>
            </div>
            
            <div className="flex bg-[#0f172a] p-1 rounded-lg border border-white/10">
                {[3, 6, 12].map((m) => (
                    <button
                        key={m}
                        onClick={() => setMonths(m)}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                            months === m 
                            ? "bg-purple-500 text-white shadow-lg" 
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                    >
                        {m} Meses
                    </button>
                ))}
            </div>
        </div>

        {isLoading ? (
             <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-purple-500" size={40} />
            </div>
        ) : projections && projections.length > 0 ? (
            <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-5 bg-white/5 border-white/10 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-1 text-gray-400">
                            <Calendar size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider">Saldo em {months} Meses</span>
                        </div>
                        <p className="text-2xl font-bold text-white">
                            {lastMonth?.balance.accumulated.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </p>
                        <span className="text-xs text-gray-500">Estimativa Realista</span>
                    </Card>

                     <Card className="p-5 bg-white/5 border-white/10 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-1 text-gray-400">
                            <TrendingUp size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider">Crescimento Previsto</span>
                        </div>
                        <p className={`text-2xl font-bold ${isPositive ? "text-[#32d6a5]" : "text-red-400"}`}>
                            {isPositive ? "+" : ""}{growth.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </p>
                        <span className="text-xs text-gray-500">No período selecionado</span>
                    </Card>

                    <Card className="p-5 bg-white/5 border-white/10 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-1 text-gray-400">
                            <AlertCircle size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider">Intervalo de Incerteza</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                             <span className="text-lg font-bold text-red-400">
                                {lastMonth?.scenarios.pessimistic.toLocaleString("pt-BR", { style: "currency", currency: "BRL", notation: "compact" })}
                             </span>
                             <span className="text-gray-500 text-xs">-</span>
                             <span className="text-lg font-bold text-[#32d6a5]">
                                {lastMonth?.scenarios.optimistic.toLocaleString("pt-BR", { style: "currency", currency: "BRL", notation: "compact" })}
                             </span>
                        </div>
                        <span className="text-xs text-gray-500">Pessimista vs Otimista</span>
                    </Card>
                </div>

                {/* Main Chart */}
                <Card className="p-6 bg-[#0f172a]/50 border-white/10 relative">
                    <CashFlowChart data={projections} />
                     <div className="flex justify-center gap-6 mt-4 text-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-400" />
                            <span className="text-gray-300">Cenário Realista</span>
                        </div>
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#32d6a5]" />
                            <span className="text-gray-300">Otimista</span>
                        </div>
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-400" />
                            <span className="text-gray-300">Pessimista</span>
                        </div>
                    </div>
                </Card>
            </>
        ) : (
             <div className="text-center py-20 text-gray-400">
                Não há dados suficientes para gerar projeções no momento.
            </div>
        )}
      </div>
    </div>
  );
}
