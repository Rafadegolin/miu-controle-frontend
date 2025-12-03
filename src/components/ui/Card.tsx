"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className = "",
  hover = false,
  onClick,
}: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={
        hover ? { y: -4, boxShadow: "0 12px 30px rgba(0, 64, 79, 0.15)" } : {}
      }
      className={cn(
        "bg-white/80 backdrop-blur-xl border border-[#3c88a0]/20 rounded-2xl p-6 shadow-sm relative overflow-hidden",
        hover && "cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
