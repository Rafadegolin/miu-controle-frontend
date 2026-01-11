"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { CheckCircle, Rocket } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StepCompletion() {
  const router = useRouter();

  useEffect(() => {
    // Fire confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

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
  }, []);

  return (
    <div className="flex flex-col items-center text-center space-y-8 py-10 max-w-lg mx-auto">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50"
      >
        <CheckCircle className="w-16 h-16 text-white" />
      </motion.div>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Tudo pronto!</h1>
        <p className="text-xl text-muted-foreground">
          Seu perfil foi configurado com sucesso. Você ganhou a badge <span className="text-primary font-bold">First Steps</span>!
        </p>
      </div>

      <div className="pt-8 w-full">
         {/* Badge visual mock */}
         <div className="mx-auto w-full max-w-xs bg-card border border-border rounded-lg p-4 flex items-center gap-4 mb-8 shadow-sm">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center text-2xl">🏆</div>
            <div className="text-left">
              <p className="font-bold text-sm">Conquista Desbloqueada</p>
              <p className="text-xs text-muted-foreground">Primeiros Passos</p>
            </div>
         </div>

         <Button 
          size="lg" 
          onClick={() => router.push('/dashboard')}
          className="cursor-pointer w-full rounded-full py-6 text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
        >
          Ir para o Dashboard <Rocket className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
