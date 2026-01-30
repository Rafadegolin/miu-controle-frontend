"use client";

import { SimulationResult } from "@/types/scenarios";
import { Card } from "@/components/ui/Card";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

interface AffordabilityResultProps {
  result: SimulationResult;
}

export function AffordabilityResult({ result }: AffordabilityResultProps) {
  if (!result.score) return null;

  const getStatusInfo = (status: string) => {
      switch (status) {
          case "CAN_AFFORD":
              return { icon: CheckCircle, text: "Viável", color: "text-[#32d6a5]", bg: "bg-[#32d6a5]/10", border: "border-[#32d6a5]/20" };
          case "CAUTION":
              return { icon: AlertTriangle, text: "Atenção", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" };
          default:
              return { icon: XCircle, text: "Não Recomendado", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" };
      }
  };

  const info = getStatusInfo(result.status || "");
  const Icon = info.icon;

  return (
    <div className="space-y-6 animate-fade-in-up">
        {/* Main Score Card */}
        <Card className={`p-8 text-center border-2 ${info.border} bg-opacity-20 relative overflow-hidden`}>
             <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
                 <div className={`h-full transition-all duration-1000 ease-out`} style={{ width: `${result.score}%`, backgroundColor: result.badgeColor }} />
             </div>
             
             <div className="flex flex-col items-center">
                 <div className={`p-4 rounded-full ${info.bg} ${info.color} mb-4`}>
                     <Icon size={48} />
                 </div>
                 <h2 className="text-4xl font-bold text-white mb-1">{result.score} <span className="text-lg text-gray-500 font-normal">/ 100</span></h2>
                 <h3 className={`text-xl font-bold ${info.color} uppercase tracking-wider mb-2`}>{info.text}</h3>
                 <p className="text-gray-400 max-w-md mx-auto">
                     Com base na sua saúde financeira atual e impacto no orçamento.
                 </p>
             </div>
        </Card>

        {/* Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-[#0b1215] border border-white/5 rounded-xl p-5">
                 <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                     <Info size={16} className="text-[#32d6a5]" /> Análise Detalhada
                 </h4>
                 <div className="space-y-3">
                     <DimensionRow label="Saldo Disponível" score={result.dimensions?.balanceScore} max={25} />
                     <DimensionRow label="Impacto no Orçamento" score={result.dimensions?.budgetScore} max={20} />
                     <DimensionRow label="Reserva de Segurança" score={result.dimensions?.reserveScore} max={20} />
                     <DimensionRow label="Metas e Sonhos" score={result.dimensions?.impactScore} max={15} />
                     <DimensionRow label="Histórico de Gastos" score={result.dimensions?.historyScore} max={10} />
                     <DimensionRow label="Timing do Mês" score={result.dimensions?.timingScore} max={10} />
                 </div>
             </div>

             <div className="bg-[#0b1215] border border-white/5 rounded-xl p-5">
                 <h4 className="font-bold text-white mb-4">Recomendações</h4>
                 <ul className="space-y-3">
                     {result.recommendations.map((rec, idx) => (
                         <li key={idx} className="flex gap-3 text-sm text-gray-300 bg-white/5 p-3 rounded-lg border-l-2 border-[#32d6a5]">
                             <span>•</span>
                             {rec}
                         </li>
                     ))}
                 </ul>
             </div>
        </div>
    </div>
  );
}

function DimensionRow({ label, score, max }: { label: string, score?: number, max: number }) {
    const validScore = score || 0;
    const isGood = validScore >= max * 0.8;
    const isMedium = validScore >= max * 0.5;
    const color = isGood ? "bg-[#32d6a5]" : isMedium ? "bg-yellow-400" : "bg-red-400";

    return (
        <div>
            <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">{label}</span>
                <span className="text-white font-bold">{validScore}/{max}</span>
            </div>
            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${(validScore / max) * 100}%` }} />
            </div>
        </div>
    )
}
