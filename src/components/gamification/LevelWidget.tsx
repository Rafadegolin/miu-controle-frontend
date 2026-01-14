"use client";

import { useGamificationProfile } from "@/hooks/useGamification";
import { useRouter } from "next/navigation";
import { Loader2, Trophy, Flame } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function LevelWidget() {
  const { data: profile, isLoading } = useGamificationProfile();
  const router = useRouter();

  if (isLoading) {
    return <div className="h-8 w-24 bg-white/5 animate-pulse rounded-full" />;
  }

  if (!profile) return null;

  const nextLevelXp = profile.nextLevelXp || 1000;
  const progress = (profile.currentXp / nextLevelXp) * 100;

  return (
    <div 
      onClick={() => router.push("/dashboard/missions")}
      className="hidden md:flex items-center gap-3 bg-[#06181b]/80 border border-white/5 rounded-full pl-1 pr-4 py-1 cursor-pointer hover:bg-[#0b1215] hover:border-[#32d6a5]/30 transition-all group"
    >
      {/* Level Badge */}
      <div className="relative w-8 h-8 flex items-center justify-center bg-linear-to-br from-[#32d6a5] to-[#1f8566] text-[#020809] font-bold rounded-full shadow-lg shadow-[#32d6a5]/20">
        <span className="text-xs">{profile.level}</span>
      </div>

      {/* Info */}
      <div className="flex flex-col w-24">
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-white transition-colors">
          <span>Level {profile.level}</span>
          <span className="text-[#32d6a5]">{Math.floor(progress)}%</span>
        </div>
        <div className="h-1.5 w-full bg-gray-700/50 rounded-full overflow-hidden mt-0.5">
          <div 
            className="h-full bg-linear-to-r from-[#32d6a5] to-[#2bc293]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      

    </div>
  );
}
