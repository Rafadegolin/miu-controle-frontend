"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export default function StepWelcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center text-center space-y-8 py-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-2 shadow-2xl border border-primary/20 backdrop-blur-md"
      >
        <span className="text-4xl text-primary animate-pulse">✦</span>
      </motion.div>

      <div className="space-y-3 max-w-lg">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground transition-colors duration-300">
          Bem-vindo ao Miu Controle
        </h1>
        <p className="text-base text-muted-foreground transition-colors duration-300">
          Sua jornada para a liberdade financeira começa agora. Vamos configurar sua experiência em poucos segundos.
        </p>
      </div>

      <div className="pt-6 w-full">
        <Button 
          size="lg" 
          onClick={onNext}
          className="cursor-pointer w-full rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold h-12 text-base transition-all hover:scale-[1.02]"
        >
          Começar <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
