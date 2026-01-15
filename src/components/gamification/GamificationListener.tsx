"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@/contexts/SocketContext";
import { LevelUpModal } from "./LevelUpModal";
import { toast } from "sonner";
import { Trophy, CheckCircle2 } from "lucide-react";
// import useSound from 'use-sound'; // Future improvement

export function GamificationListener() {
  const { socket } = useSocket();
  const [levelUpData, setLevelUpData] = useState<{ level: number; xpEarned?: number } | null>(null);

  useEffect(() => {
    if (!socket) return;

    // Listener for Level Up
    const onLevelUp = (data: { level: number; xpEarned: number; userId: string }) => {
      console.log("🎮 GAMIFICATION EVENT: Level Up!", data);
      setLevelUpData({ level: data.level, xpEarned: data.xpEarned });
      // playLevelUpSound();
    };

    // Listener for Mission Completed
    const onMissionCompleted = (data: { missionTitle: string; xpReward: number }) => {
      console.log("🎮 GAMIFICATION EVENT: Mission Completed!", data);
      toast.success(data.missionTitle, {
        description: `Missão concluída! +${data.xpReward} XP`,
        icon: <Trophy className="text-yellow-400" size={20} />,
        duration: 5000,
      });
    };

    socket.on("gamification.level_up", onLevelUp);
    socket.on("mission.completed", onMissionCompleted);

    return () => {
      socket.off("gamification.level_up", onLevelUp);
      socket.off("mission.completed", onMissionCompleted);
    };
  }, [socket]);

  return (
    <>
      <LevelUpModal
        isOpen={!!levelUpData}
        onClose={() => setLevelUpData(null)}
        level={levelUpData?.level || 1}
        xpEarned={levelUpData?.xpEarned}
      />
    </>
  );
}
