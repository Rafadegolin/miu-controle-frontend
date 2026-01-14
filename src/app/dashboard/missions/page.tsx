"use client";

import { useMissions, useClaimMissionReward } from "@/hooks/useGamification";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Trophy, CheckCircle, Lock, Loader2, Star } from "lucide-react";
import { toast } from "sonner";

export default function MissionsPage() {
  const { data: missions, isLoading } = useMissions();
  const { mutate: claimReward, isPending } = useClaimMissionReward();

  const handleClaim = (missionId: string, xp: number) => {
    claimReward(missionId, {
      onSuccess: () => toast.success(`Recompensa coletada! +${xp} XP`),
      onError: () => toast.error("Erro ao coletar recompensa."),
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#00404f]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-full bg-linear-to-br from-[#32d6a5] to-[#1f8566] shadow-lg shadow-[#32d6a5]/20">
            <Trophy className="text-[#020809]" size={24} />
        </div>
        <div>
           <h2 className="text-2xl font-bold text-white">Missões e Conquistas</h2>
           <p className="text-gray-400">Complete tarefas para subir de nível e desbloquear recursos.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {missions?.map((mission) => (
          <Card 
            key={mission.id} 
            className={`p-5 flex items-center justify-between transition-all rounded-2xl ${
                mission.isCompleted && !mission.isClaimed 
                ? "border border-[#32d6a5] bg-[#32d6a5]/10 shadow-[0_0_15px_rgba(50,214,165,0.1)]" 
                : "bg-[#0b1215] border border-white/5 opacity-90"
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-white">{mission.title}</h3>
                {mission.isClaimed && <CheckCircle size={16} className="text-[#32d6a5]" />}
              </div>
              <p className="text-sm text-gray-400 mb-3">{mission.description}</p>
              
              <div className="flex items-center gap-2 text-xs font-bold text-[#32d6a5] bg-[#32d6a5]/10 w-fit px-2 py-1 rounded-full">
                <Star size={12} className="fill-[#32d6a5]" />
                +{mission.rewardXp} XP
              </div>
            </div>

            <div className="ml-4">
               {mission.isClaimed ? (
                 <Button disabled variant="ghost" size="sm" className="text-gray-400">
                    Coletado
                 </Button>
               ) : mission.isCompleted ? (
                 <Button 
                    onClick={() => handleClaim(mission.id, mission.rewardXp)}
                    disabled={isPending}
                    className="bg-[#32d6a5] hover:bg-[#2bc293] text-[#020809] font-bold shadow-md shadow-[#32d6a5]/30 animate-pulse border-none"
                 >
                    {isPending ? <Loader2 className="animate-spin" /> : "Coletar"}
                 </Button>
               ) : (
                 <div className="text-center px-4 py-2 bg-white/5 border border-white/5 text-gray-500 rounded-lg text-xs font-bold flex flex-col items-center gap-1">
                    <Lock size={16} />
                    <span>Bloqueado</span>
                 </div>
               )}
            </div>
          </Card>
        ))}

        {missions?.length === 0 && (
            <div className="col-span-full py-16 text-center text-gray-400">
                Nenhuma missão disponível no momento.
            </div>
        )}
      </div>
    </div>
  );
}
