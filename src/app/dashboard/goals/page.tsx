"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Target, Wallet, Loader2 } from "lucide-react";

// Simple Icon wrapper or just use Lucide Target
// Simple Icon wrapper or just use Lucide Target
const TargetIcon = () => (
    <div className="w-8 h-8 rounded-full border border-[#32d6a5]/20 flex items-center justify-center">
        <Target size={14} className="text-[#32d6a5]" />
    </div>
);
import { useGoals } from "@/hooks/useGoals";
import { useRouter } from "next/navigation";
import { CreateGoalModal } from "@/components/goals/CreateGoalModal";
import styles from "@/components/dashboard/styles/Dashboard.module.css";

export default function GoalsPage() {
  const { data: allGoals, isLoading } = useGoals();
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filter only ROOT goals for display
  const goals = allGoals?.filter(g => !g.parentId && (g.status === 'ACTIVE' || !g.status));
  const childrenMap = allGoals?.reduce((acc, goal) => {
      if(goal.parentId) {
          acc[goal.parentId] = (acc[goal.parentId] || 0) + 1;
      }
      return acc;
  }, {} as Record<string, number>);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#00404f]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up pb-20">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-white">Metas Financeiras</h2>
           <p className="text-gray-400 text-sm">Defina objetivos e acompanhe seu progresso.</p>
        </div>
        <Button className="bg-[#32d6a5] hover:bg-[#2bc293] text-[#020809] font-bold rounded-lg border-none" onClick={() => setIsCreateModalOpen(true)}>
          <Plus size={18} className="mr-2" /> Nova Meta
        </Button>
      </div>

      <CreateGoalModal 
        open={isCreateModalOpen} 
        onOpenChange={setIsCreateModalOpen} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {goals?.map((goal) => {
             // Calculate progress
             const percentage = Math.min(
                100, 
                Math.round((goal.currentAmount / goal.targetAmount) * 100)
             );
             
             const childCount = childrenMap?.[goal.id] || 0;

             return (
              <div 
                key={goal.id}
                onClick={() => router.push(`/dashboard/goals/${goal.id}`)}
                className={`${styles.glassCard} group cursor-pointer hover:border-[#32d6a5]/30 transition-all relative overflow-hidden flex flex-col justify-between min-h-[180px]`}
              >
                  <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#131b20] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform relative">
                              {goal.icon || "🎯"}
                              {childCount > 0 && (
                                  <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#32d6a5] text-[10px] font-bold text-black border border-[#0b1215]">
                                      {childCount}
                                  </div>
                              )}
                          </div>
                          <div>
                              <h3 className="text-lg font-bold text-[#32d6a5] group-hover:text-[#4affcf] transition-colors">{goal.name}</h3>
                              <p className="text-xs text-gray-500">
                                  {childCount > 0 ? `${childCount} sub-metas` : (goal.targetDate ? new Date(goal.targetDate).toLocaleDateString() : 'Sem data')}
                              </p>
                          </div>
                      </div>
                      <div className="opacity-50 group-hover:opacity-100 transition-opacity">
                          <TargetIcon />
                      </div>
                  </div>

                  <div className="space-y-2">
                       <div className="flex justify-between text-xs font-bold text-gray-400">
                           <span>Progresso</span>
                           <span className="text-[#32d6a5]">{percentage}%</span>
                       </div>
                       
                       <div className="h-2 w-full bg-gray-800/50 rounded-full overflow-hidden">
                           <div 
                                className="h-full bg-[#32d6a5] shadow-[0_0_10px_rgba(50,214,165,0.3)] transition-all duration-1000 ease-out" 
                                style={{ width: `${percentage}%` }}
                           />
                       </div>

                       <div className="flex justify-between text-[10px] font-bold text-gray-600 mt-1">
                           <span>{goal.currentAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                           <span>{goal.targetAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                       </div>
                  </div>
              </div>
             );
        })}
        
        {goals?.length === 0 && (
          <div className="col-span-full py-16 text-center">
             <div className="w-16 h-16 bg-[#131b20] rounded-full flex items-center justify-center mx-auto mb-4 text-gray-600">
                <Target size={24} />
             </div>
             <h3 className="text-white font-bold mb-1">Nenhuma meta criada</h3>
             <p className="text-gray-500 text-sm">Comece definindo um objetivo financeiro.</p>
          </div>
        )}
      </div>
    </div>
  );
}
