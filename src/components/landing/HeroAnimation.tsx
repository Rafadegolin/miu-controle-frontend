"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  Check,
  Target,
  Utensils,
  CheckCircle2,
  BrainCircuit,
} from "lucide-react";

export function HeroAnimation() {
  return (
    <div className="relative w-full max-w-lg mx-auto h-[600px] bg-[#00404f]/30 backdrop-blur-xl border border-[#7cddb1]/20 rounded-4xl p-8 overflow-hidden shadow-2xl">
      {/* Mockup Phone */}
      <div className="relative w-full h-full bg-black rounded-5xl border-8 border-[#1a1a1a] shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-xl z-20"></div>

        <div className="w-full h-full bg-[#F8FAFC] relative pt-12 px-4">
          {/* Animação Sequencial */}
          <div className="space-y-4">
            {/* Notificação */}
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-[#820AD1] rounded-lg flex items-center justify-center text-white">
                <CreditCard size={20} />
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500">Nubank • Agora</div>
                <div className="text-sm font-bold text-gray-800">
                  Compra de R$ 45,00
                </div>
                <div className="text-xs text-gray-600">Restaurante ABC</div>
              </div>
            </motion.div>

            {/* IA Processando */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
              className="flex items-center justify-center py-8"
            >
              <div className="w-16 h-16 bg-[#00404f] rounded-full flex items-center justify-center relative">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 bg-[#7cddb1] rounded-full blur-lg"
                ></motion.div>
                <BrainCircuit
                  className="text-[#7cddb1] relative z-10"
                  size={32}
                />
              </div>
            </motion.div>

            {/* Categorização */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 3.5 }}
              className="bg-[#00404f] text-white p-4 rounded-xl shadow-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#7cddb1] text-xs font-bold">
                  IA DETECTOU
                </span>
                <CheckCircle2 size={14} className="text-[#7cddb1]" />
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg text-[#ff6b6b]">
                  <Utensils size={20} />
                </div>
                <div>
                  <div className="font-bold">Alimentação</div>
                  <div className="text-xs text-white/60">Restaurante ABC</div>
                </div>
                <div className="ml-auto font-mono font-bold text-[#ff6b6b]">
                  - R$ 45,00
                </div>
              </div>
            </motion.div>

            {/* Dashboard Atualizado */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 5 }}
              className="mt-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="text-xs text-gray-400 uppercase mb-1">
                Saldo Disponível
              </div>
              <div className="text-3xl font-bold text-[#00404f]">
                R$ 1.292,00
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
                <motion.div
                  initial={{ width: "80%" }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1, delay: 5.5 }}
                  className="h-full bg-[#7cddb1]"
                ></motion.div>
              </div>
            </motion.div>

            {/* Success */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, y: -20 }}
              transition={{ duration: 0.5, delay: 6.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#007459] text-white px-6 py-3 rounded-full shadow-xl font-bold flex items-center gap-2 whitespace-nowrap z-50"
            >
              <Check size={20} /> Registrado!
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
