import { useEffect, useState } from "react";
import { aiAnalyticsActions } from "@/services/ai-analytics.actions";
import { GoalForecastResponse } from "@/types/api";
import { Loader2, Calendar, Target, TrendingUp, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatCurrency } from "@/lib/utils";

interface GoalForecastProps {
  goalId: string;
}

export function GoalForecast({ goalId }: GoalForecastProps) {
  const [forecast, setForecast] = useState<GoalForecastResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await aiAnalyticsActions.getGoalForecast(goalId);
        setForecast(data);
      } catch (error) {
        console.error("Failed to load goal forecast", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [goalId]);

  if (loading) {
    return (
        <div className="flex items-center gap-2 text-sm text-gray-500 animate-pulse">
            <Loader2 size={16} className="animate-spin" />
            <span className="text-xs">Calculando previsão...</span>
        </div>
    );
  }

  if (!forecast) return null;

  return (
    <div className="bg-linear-to-br from-[#0f172a] to-[#06181b] border border-white/10 rounded-xl p-4 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded bg-purple-500/10 text-purple-400">
           <TrendingUp size={16} />
        </div>
        <h4 className="font-bold text-white text-sm">Previsão Inteligente</h4>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Status Previsto</span>
            <span className={`px-2 py-0.5 rounded textxs font-bold ${
                forecast.status === "COMPLETED" ? "bg-green-500/10 text-green-500" :
                forecast.status === "ON_TRACK" ? "bg-[#32d6a5]/10 text-[#32d6a5]" :
                "bg-red-500/10 text-red-500"
            }`}>
                {forecast.status === "COMPLETED" ? "Concluída" :
                 forecast.status === "ON_TRACK" ? "No Prazo" : "Atrasada"}
            </span>
        </div>

        {forecast.completionDate && (
            <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Data Estimada</span>
                <span className="text-white font-mono">
                    {format(new Date(forecast.completionDate), "dd 'de' MMM, yyyy", { locale: ptBR })}
                </span>
            </div>
        )}

        {forecast.requiredMonthlyContribution && (
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Aporte Sugerido</span>
                <span className="text-[#32d6a5] font-bold">
                    {formatCurrency(forecast.requiredMonthlyContribution)}/mês
                </span>
            </div>
        )}

        <div className="bg-white/5 p-2 rounded text-xs text-gray-300 flex gap-2 items-start mt-2">
           <Target size={14} className="mt-0.5 shrink-0 text-purple-400" />
           {forecast.message}
        </div>
      </div>
    </div>
  );
}
