import { useEffect, useState } from "react";
import { aiSettingsActions } from "@/services/ai-settings.actions";
import { AiUsageStatsResponse, AiCategorizationStatsResponse } from "@/types/api";
import { Loader2, Coins, BarChart3, TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export function AiStatsDashboard() {
  const [usage, setUsage] = useState<AiUsageStatsResponse | null>(null);
  const [catStats, setCatStats] = useState<AiCategorizationStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [usageData, catData] = await Promise.all([
          aiSettingsActions.getUsageStats(),
          aiSettingsActions.getCategorizationStats()
        ]);
        setUsage(usageData);
        setCatStats(catData);
      } catch (error) {
        console.error("Failed to load AI stats", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-[#32d6a5]" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cost Card */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
             <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500">
               <Coins size={20} />
             </div>
             <div>
               <p className="text-gray-400 text-xs">Custo Estimado ({usage?.month})</p>
               <h4 className="text-xl font-bold text-white">
                 {usage ? formatCurrency(usage.totalCostBRL) : "R$ 0,00"}
               </h4>
             </div>
          </div>
          <div className="text-xs text-gray-500 flex justify-between">
            <span>{usage?.totalTokens.toLocaleString()} tokens</span>
            <span>Est. USD {usage?.totalCost.toFixed(4)}</span>
          </div>
        </div>

        {/* Accuracy Card */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
           <div className="flex items-center gap-3 mb-3">
             <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
               <BarChart3 size={20} />
             </div>
             <div>
               <p className="text-gray-400 text-xs">Precisão da IA</p>
               <h4 className="text-xl font-bold text-white">
                 {catStats ? `${catStats.accuracy.toFixed(1)}%` : "0%"}
               </h4>
             </div>
          </div>
          <Progress value={catStats?.accuracy || 0} className="h-1.5" />
          <p className="text-xs text-gray-500 mt-2">
            Baseado em {catStats?.totalPredictions} categorizações
          </p>
        </div>
      </div>

      {/* Feature Usage Details */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="text-[#32d6a5]" size={18} />
          Uso por Funcionalidade
        </h4>
        <div className="space-y-4">
          {usage?.byFeature && Object.entries(usage.byFeature).map(([feature, stats]) => (
            <div key={feature} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div>
                <p className="text-sm font-medium text-white capitalize">
                  {feature.toLowerCase().replace('_', ' ')}
                </p>
                <div className="flex gap-3 text-xs text-gray-400">
                  <span>{stats.requests} requests</span>
                  <span>{stats.tokens.toLocaleString()} tokens</span>
                </div>
              </div>
              <span className="text-white font-mono text-sm">
                ${stats.cost.toFixed(4)}
              </span>
            </div>
          ))}
          {(!usage?.byFeature || Object.keys(usage.byFeature).length === 0) && (
            <p className="text-sm text-gray-500 text-center py-2">Sem uso registrado neste mês.</p>
          )}
        </div>
      </div>

       {/* Categorization Health */}
       {catStats && (
         <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
           {catStats.accuracy > 90 ? (
             <CheckCircle className="text-[#32d6a5]" size={24} />
           ) : (
             <AlertTriangle className="text-yellow-500" size={24} />
           )}
           <div>
             <h5 className="font-bold text-white text-sm">Saúde do Modelo</h5>
             <p className="text-xs text-gray-400">{catStats.message}</p>
           </div>
         </div>
       )}
    </div>
  );
}
