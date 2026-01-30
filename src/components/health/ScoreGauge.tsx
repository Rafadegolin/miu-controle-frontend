"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HealthLevel } from "@/types/api";

interface Props {
  score: number;
  level: HealthLevel;
}

export function ScoreGauge({ score, level }: Props) {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Constants
  const maxScore = 1000;
  const radius = 120;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(score / maxScore, 1);
  const strokeDashoffset = circumference - progress * circumference;

  useEffect(() => {
    // Determine target score for simple counter animation
    const timeout = setTimeout(() => {
        setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timeout);
  }, [score]);

  const getLevelColor = (level: HealthLevel) => {
    switch(level) {
        case HealthLevel.EXCELLENT: return "#32d6a5"; // Neon Green
        case HealthLevel.GOOD: return "#32d6a5"; // Using neon green for good too, maybe slightly different
        case HealthLevel.HEALTHY: return "#facc15"; // Yellow
        case HealthLevel.ATTENTION: return "#f97316"; // Orange
        case HealthLevel.CRITICAL: return "#ef4444"; // Red
        default: return "#32d6a5";
    }
  }

  const color = getLevelColor(level);

  return (
    <div className="relative flex items-center justify-center w-80 h-80 mx-auto">
        {/* Shadow/Glow Background */}
        <div 
            className="absolute inset-0 rounded-full blur-[60px] opacity-20" 
            style={{ backgroundColor: color }}
        />

        <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl">
            {/* Background Circle */}
            <circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="white"
                strokeWidth={strokeWidth}
                fill="transparent"
                className="opacity-10"
            />
            {/* Progress Circle */}
            <motion.circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
             <motion.span 
                className="text-6xl font-black text-white tracking-tighter"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
             >
                 {score}
             </motion.span>
             <motion.span 
                className="text-sm font-bold tracking-widest uppercase mt-2 px-3 py-1 rounded-full bg-white/10"
                style={{ color: color }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
             >
                 {level}
             </motion.span>
        </div>
    </div>
  );
}
