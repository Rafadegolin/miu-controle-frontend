"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/lib/constants";

interface BalanceRingProps {
  available: number;
  budget: number;
  used: number;
}

export function BalanceRing({ available, budget, used }: BalanceRingProps) {
  const percentage = Math.min((used / budget) * 100, 100);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#7cddb1] opacity-10 blur-2xl rounded-full"></div>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="#3c88a0"
          strokeWidth="10"
          fill="none"
          opacity="0.1"
        />
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          stroke={COLORS.accent}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center text-center">
        <span className="text-[#00404f]/60 text-xs font-bold uppercase tracking-wider mb-1">
          Disponível
        </span>
        <h2 className="text-3xl font-bold text-[#00404f] tracking-tight">
          <span className="text-lg align-top opacity-60 mr-1">R$</span>
          {available.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}
        </h2>
        <p className="text-[#00404f]/40 text-xs mt-1">
          {Math.round((used / budget) * 100)}% usado
        </p>
      </div>
    </div>
  );
}
