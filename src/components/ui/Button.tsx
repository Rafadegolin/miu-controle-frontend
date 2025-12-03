"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    | "onDrag"
    | "onDragEnd"
    | "onDragStart"
    | "onAnimationStart"
    | "onAnimationEnd"
  > {
  children: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "mint"
    | "outline"
    | "landingPrimary"
    | "landingSecondary";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    primary:
      "bg-[#00404f] hover:bg-[#3c88a0] text-white shadow-lg hover:shadow-[#3c88a0]/30 active:scale-95 transition-all duration-200 border border-[#00404f]/20",
    secondary:
      "bg-white text-[#00404f] border border-[#00404f]/10 hover:border-[#00404f]/30 hover:bg-[#00404f]/5 shadow-sm active:scale-95",
    ghost:
      "text-[#00404f]/70 hover:bg-[#00404f]/5 hover:text-[#00404f] active:scale-95",
    mint: "bg-[#7cddb1] hover:bg-[#007459] text-[#00404f] font-bold hover:text-white shadow-lg hover:shadow-[#7cddb1]/30 active:scale-95 transition-all duration-200",
    outline:
      "border-2 border-[#00404f]/20 text-[#00404f] hover:border-[#00404f] hover:bg-[#00404f]/5 active:scale-95",
    landingPrimary:
      "bg-linear-to-r from-[#3c88a0] to-[#7cddb1] text-white font-bold shadow-[0_8px_32px_rgba(124,221,177,0.4)] hover:shadow-[0_12px_48px_rgba(124,221,177,0.6)] hover:-translate-y-1 active:translate-y-0 transition-all border-none",
    landingSecondary:
      "bg-white/10 backdrop-blur-md border border-[#7cddb1]/30 text-white hover:bg-white/20 hover:border-[#7cddb1] active:scale-95 transition-all",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(
        "font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
