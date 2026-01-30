"use client";

import { useGamificationProfile } from "@/hooks/useGamification";
import { Flame } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function StreakWidget() {
  const { data: profile, isLoading } = useGamificationProfile();

  if (isLoading || !profile) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full hover:bg-orange-500/20 transition-colors cursor-default">
                <Flame className="text-orange-500 fill-orange-500 animate-pulse" size={16} />
                <span className="text-sm font-bold text-orange-400 font-mono">
                    {profile.streak}
                </span>
            </div>
        </TooltipTrigger>
        <TooltipContent className="bg-[#0f172a] border-gray-800 text-white">
          <p>Ofensiva: {profile.streak} dias seguidos!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
