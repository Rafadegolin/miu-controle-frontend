import { GoalImpact } from "@/types/inflation";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight, Target } from "lucide-react";

interface Props {
  goals: GoalImpact[];
}

export function GoalsImpactList({ goals }: Props) {
  if (!goals || goals.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
         <Target className="text-[#32d6a5]" /> Impacto nas Metas Ativas
      </h3>
      <div className="bg-black/20 rounded-xl overflow-hidden">
        {goals.map((goal, index) => (
          <div 
            key={goal.goalId} 
             className={`p-4 flex items-center justify-between border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors`}
          >
             <div>
                 <p className="font-bold text-white">{goal.goalName}</p>
                 <div className="flex items-center gap-2 text-sm mt-1">
                     <span className="text-gray-400">Atual: {formatCurrency(goal.currentCost)}</span>
                     <ArrowRight size={14} className="text-gray-600" />
                     <span className="text-yellow-400 font-bold">Ajustado: {formatCurrency(goal.projectedCost)}</span>
                 </div>
             </div>
             <div className="text-right">
                 <p className="text-xs text-red-400 font-bold">+{formatCurrency(goal.difference)}</p>
                 <p className="text-[10px] text-gray-500">Custo extra</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
