import { useEffect, useState } from "react";
import { aiAnalyticsActions } from "@/services/ai-analytics.actions";
import { ForecastResponse } from "@/types/api";
import { formatCurrency } from "@/lib/utils";
import { Sparkles, TrendingUp, TrendingDown, Target, Loader2 } from "lucide-react";
import styles from "@/components/dashboard/styles/Dashboard.module.css";
import { Progress } from "@/components/ui/progress";

export function AiForecastCard() {
  const [data, setData] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await aiAnalyticsActions.getForecast();
        if (res.available) {
          setData(res);
        }
      } catch (err) {
        console.error("Failed to load forecast", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className={`${styles.glassCard} p-6 flex items-center justify-center min-h-[200px]`}>
        <div className="flex flex-col items-center gap-2 text-gray-500 text-sm">
          <Loader2 className="animate-spin text-[#32d6a5]" />
          <span>Analisando padrões...</span>
        </div>
      </div>
    );
  }

  if (!data?.available) return null; // Or return a "Activate AI" card

  const { forecast, trends } = data;

  return (
    <div className={`${styles.glassCard} p-6 relative overflow-hidden group`}>
      {/* Background decoration */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-linear-to-br from-[#32d6a5]/20 to-transparent rounded-full blur-3xl group-hover:bg-[#32d6a5]/30 transition-all duration-1000"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-linear-to-br from-[#32d6a5] to-[#20bca3] text-[#020809] shadow-[0_0_15px_rgba(50,214,165,0.4)]">
              <Sparkles size={18} />
            </span>
            <div>
              <h3 className="font-bold text-white text-lg">Previsão Inteligente</h3>
              <p className="text-xs text-gray-400">Próximo mês</p>
            </div>
          </div>
          <div className="text-right">
             <div className="flex items-center gap-1 justify-end">
               <span className="text-2xl font-bold text-white">{forecast.healthScore}</span>
               <span className="text-xs text-gray-500">/100</span>
             </div>
             <p className="text-[10px] text-[#32d6a5] font-bold uppercase tracking-wider">Health Score</p>
          </div>
        </div>

        <p className="text-gray-300 text-sm italic mb-6 border-l-2 border-[#32d6a5] pl-3 py-1 bg-white/5 rounded-r-lg">
          "{forecast.summary}"
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
             <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
               <TrendingDown className="text-red-400" size={14} />
               Despesas Previstas
             </p>
             <p className="text-lg font-bold text-white">{formatCurrency(forecast.predictedExpense)}</p>
             {trends.expenseTrendSlope > 0 ? (
                <span className="text-[10px] text-red-500 font-bold">⚠️ Tendência de alta</span>
             ) : (
                <span className="text-[10px] text-[#32d6a5] font-bold">📉 Tendência de queda</span>
             )}
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
             <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
               <Target className="text-blue-400" size={14} />
               Meta de Economia
             </p>
             <p className="text-lg font-bold text-white">{formatCurrency(forecast.savingsGoal)}</p>
             <p className="text-[10px] text-gray-500">Sugerido p/ segurança</p>
          </div>
        </div>

        <div>
           <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Insights</p>
           <ul className="space-y-2">
             {forecast.insights.slice(0, 2).map((insight, i) => (
                <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#32d6a5] mt-1.5 shrink-0"></span>
                  {insight}
                </li>
             ))}
           </ul>
        </div>
      </div>
    </div>
  );
}
