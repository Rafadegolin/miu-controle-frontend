"use client";

import { useState } from "react";
import { refreshInsights } from "@/services/health-score.actions";
import { Sparkles, RefreshCw, Lightbulb, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Props {
  insight?: {
    message: string;
    actionItem?: string;
  };
}

export function AiInsightCard({ insight: initialInsight }: Props) {
  const [insight, setInsight] = useState(initialInsight);
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const message = await refreshInsights();
      setInsight({ 
          message,
          actionItem: "Novo insight gerado. Aplique agora!", // Simplified for mock
      });
      toast.success("Nova análise gerada com sucesso!");
    } catch (error) {
      toast.error("Erro ao gerar insight.");
    } finally {
      setLoading(false);
    }
  };

  if (!insight) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-violet-600/20 to-indigo-600/20 border border-violet-500/30 p-6">
       {/* Background Decoration */}
       <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-violet-500/30 rounded-full blur-[50px]" />
       
       <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-violet-300 font-bold">
                  <Sparkles size={18} />
                  <h3>Diagnóstico IA</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleRefresh}
                disabled={loading}
                className="text-violet-300 hover:text-white hover:bg-violet-500/20"
              >
                  <RefreshCw size={14} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Atualizar
              </Button>
          </div>

          <motion.div
             key={insight.message}
             initial={{ opacity: 0, y: 5 }}
             animate={{ opacity: 1, y: 0 }}
             className="space-y-4"
          >
             <p className="text-white text-lg font-medium leading-relaxed">
                 "{insight.message}"
             </p>
             
             {insight.actionItem && (
                 <div className="flex items-start gap-3 bg-violet-500/10 p-3 rounded-lg border border-violet-500/20">
                     <Lightbulb className="text-yellow-400 shrink-0 mt-1" size={16} />
                     <div>
                         <p className="text-sm text-violet-200 font-bold mb-1">Sugestão de Ação:</p>
                         <p className="text-sm text-gray-300">{insight.actionItem}</p>
                     </div>
                 </div>
             )}
          </motion.div>
       </div>
    </div>
  );
}
