"use client";

import { HealthPilar } from "@/types/api";
import { Progress } from "@/components/ui/progress";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Props {
  pilar: HealthPilar;
}

export function PilarCard({ pilar }: Props) {
  // Dynamically resolve icon
  // @ts-ignore
  const IconComponent = (Icons[pilar.icon] || Icons.HelpCircle) as LucideIcon;

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${pilar.color}20`, color: pilar.color }}
        >
            <IconComponent size={20} />
        </div>
        <div className="flex-1">
            <h4 className="font-bold text-white text-sm">{pilar.label}</h4>
            <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold" style={{ color: pilar.color }}>{pilar.score}</span>
                <span className="text-xs text-gray-500">/ {pilar.maxScore}</span>
            </div>
        </div>
        <span className="text-xs font-medium text-gray-400">{pilar.percentage}%</span>
      </div>
      
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${pilar.percentage}%`, backgroundColor: pilar.color }}
        />
      </div>
    </div>
  );
}
