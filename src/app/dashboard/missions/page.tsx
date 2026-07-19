"use client";

import { useQuery } from "@tanstack/react-query";
import { useMissions } from "@/hooks/useGamification";
import { gamificationActions } from "@/services/gamification.actions";
import { Card } from "@/components/ui/Card";
import { Trophy, CheckCircle, Lock, Loader2, Star } from "lucide-react";

export default function MissionsPage() {
  const { data: missions, isLoading } = useMissions();
  const { data: achievements } = useQuery({
    queryKey: ["gamification", "achievements"],
    queryFn: () => gamificationActions.getAchievements(),
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#32d6a5]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up pb-10">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-full bg-linear-to-br from-[#32d6a5] to-[#1f8566] shadow-lg shadow-[#32d6a5]/20">
          <Trophy className="text-[#020809]" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Missões e Conquistas</h2>
          <p className="text-gray-400">
            Complete tarefas para subir de nível e desbloquear recursos.
          </p>
        </div>
      </div>

      {/* MISSÕES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {missions?.map((mission) => {
          const pct =
            mission.target > 0
              ? Math.min(
                  100,
                  Math.round((mission.progress / mission.target) * 100),
                )
              : 0;
          return (
            <Card
              key={mission.id}
              className={`p-5 rounded-2xl bg-[#0b1215] border transition-all ${
                mission.isCompleted
                  ? "border-[#32d6a5]/30 bg-[#32d6a5]/5"
                  : "border-white/5"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white">{mission.title}</h3>
                    {mission.isCompleted && (
                      <CheckCircle size={16} className="text-[#32d6a5]" />
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    {mission.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#32d6a5] bg-[#32d6a5]/10 w-fit px-2 py-1 rounded-full">
                    <Star size={12} className="fill-[#32d6a5]" />
                    +{mission.rewardXp} XP
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">
                    {mission.isCompleted ? "Concluída" : "Progresso"}
                  </span>
                  <span className="text-white font-bold">
                    {mission.progress}/{mission.target}
                  </span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#32d6a5] transition-all duration-1000 ease-out"
                    style={{ width: `${mission.isCompleted ? 100 : pct}%` }}
                  />
                </div>
              </div>
            </Card>
          );
        })}

        {missions?.length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-400">
            Nenhuma missão disponível no momento.
          </div>
        )}
      </div>

      {/* CONQUISTAS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="text-[#32d6a5]" size={20} /> Conquistas
          </h3>
          {achievements && (
            <span className="text-sm font-semibold text-[#32d6a5]">
              {achievements.totalPoints} pts
            </span>
          )}
        </div>

        {!achievements ? (
          <div className="text-gray-500 text-sm">Carregando conquistas…</div>
        ) : achievements.unlocked.length === 0 &&
          achievements.locked.length === 0 ? (
          <div className="text-center text-gray-500 py-8 text-sm">
            Nenhuma conquista disponível ainda.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.unlocked.map((a) => (
              <Card
                key={a.id}
                className="p-4 bg-[#32d6a5]/5 border border-[#32d6a5]/20 text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-[#32d6a5]/10 grid place-items-center text-[#32d6a5] mb-2">
                  <Trophy size={22} />
                </div>
                <p className="font-semibold text-white text-sm">{a.name}</p>
                <p className="text-[#32d6a5] text-xs mt-1">+{a.points} pts</p>
              </Card>
            ))}
            {achievements.locked.map((a) => (
              <Card
                key={a.id}
                className="p-4 bg-[#0b1215] border border-white/5 text-center opacity-60"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-white/5 grid place-items-center text-gray-500 mb-2">
                  <Lock size={20} />
                </div>
                <p className="font-semibold text-gray-300 text-sm">{a.name}</p>
                <p className="text-gray-500 text-xs mt-1">{a.points} pts</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
