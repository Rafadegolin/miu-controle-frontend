import { useEffect, useState } from "react";
import { aiAnalyticsActions } from "@/services/ai-analytics.actions";
import { Anomaly } from "@/types/api";
import { formatCurrency } from "@/lib/utils";
import { AlertTriangle, Check, X } from "lucide-react";
import styles from "@/components/dashboard/styles/Dashboard.module.css";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export function AiAnomaliesWidget() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await aiAnalyticsActions.getAnomalies();
      // Filter only non-dismissed
      setAnomalies(data.filter(a => !a.isDismissed && a.transaction));
    } catch (err) {
      console.error("Failed to load anomalies", err);
    }
  }

  async function handleDismiss(id: string) {
    try {
      await aiAnalyticsActions.dismissAnomaly(id);
      setAnomalies(prev => prev.filter(a => a.id !== id));
      toast.success("Anomalia marcada como vista.");
    } catch (error) {
       toast.error("Erro ao atualizar anomalia.");
    }
  }

  if (anomalies.length === 0) return null;

  return (
    <div className={`${styles.glassCard} p-5 border-l-4 border-l-yellow-500`}>
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="text-yellow-500 animate-pulse" size={20} />
        <h4 className="font-bold text-white text-sm">Atenção Necessária</h4>
        <span className="text-xs font-bold bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full">
           {anomalies.length}
        </span>
      </div>

      <div className="space-y-3">
        {anomalies.slice(0, 3).map((anomaly) => (
           <div key={anomaly.id} className="bg-white/5 p-3 rounded-lg flex justify-between items-start gap-3">
              <div>
                 <p className="text-white font-bold text-sm">
                   {formatCurrency(anomaly.transaction.amount)} 
                   <span className="font-normal text-gray-400 text-xs ml-1">em {anomaly.transaction.description}</span>
                 </p>
                 <p className="text-xs text-yellow-200/80 mt-1 leading-tight">
                    {anomaly.explanation}
                 </p>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-6 w-6 text-gray-400 hover:text-white hover:bg-white/10"
                onClick={() => handleDismiss(anomaly.id)}
                title="Ignorar alerta"
              >
                 <Check size={14} />
              </Button>
           </div>
        ))}
      </div>
    </div>
  );
}
