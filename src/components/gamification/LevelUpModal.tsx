"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Star, ArrowUp } from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/Button";

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: number;
  xpEarned?: number;
}

export function LevelUpModal({ isOpen, onClose, level, xpEarned }: LevelUpModalProps) {
  useEffect(() => {
    if (isOpen) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // Use portal to render at root level to avoid z-index issues
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 15 }}
            className="relative w-full max-w-md bg-[#06181b] border-2 border-[#32d6a5] rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(50,214,165,0.3)] overflow-hidden"
          >
             {/* Background glow effects */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#32d6a5]/20 via-transparent to-transparent pointer-events-none" />

            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10"
            >
                <X size={24} />
            </button>

            <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-linear-to-br from-[#32d6a5] to-[#20bca3] flex items-center justify-center mb-6 shadow-lg shadow-[#32d6a5]/40 animate-bounce-slow">
                    <Trophy size={48} className="text-[#020809]" />
                </div>

                <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-black text-white mb-2 tracking-tight"
                >
                    LEVEL UP!
                </motion.h2>
                
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="flex items-center gap-3 text-2xl font-bold text-[#32d6a5] mb-6"
                >
                    <span>NÍVEL {level}</span>
                    <ArrowUp size={24} strokeWidth={3} />
                </motion.div>

                <p className="text-gray-300 mb-8 leading-relaxed">
                    Parabéns! Sua gestão financeira está cada vez melhor. Continue cumprindo missões para desbloquear novas conquistas.
                </p>

                {xpEarned && (
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-8">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-white font-bold">+{xpEarned} XP</span>
                    </div>
                )}

                <Button 
                    onClick={onClose}
                    className="w-full bg-[#32d6a5] hover:bg-[#20bca3] text-[#020809] font-bold py-6 text-lg rounded-xl shadow-lg shadow-[#32d6a5]/20"
                >
                    Continuar Evoluindo
                </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
