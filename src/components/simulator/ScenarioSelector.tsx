"use client";

import { ScenarioType } from "@/types/scenarios";
import { Car, TrendingDown, Repeat, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ScenarioSelectorProps {
  selected: ScenarioType | null;
  onSelect: (type: ScenarioType) => void;
}

const scenarios = [
  {
    type: ScenarioType.BIG_PURCHASE,
    title: "Grande Compra",
    description: "Carro, Imóvel ou Viagem",
    icon: Car,
    color: "from-blue-500 to-cyan-500",
  },
  {
    type: ScenarioType.INCOME_LOSS,
    title: "Perda de Renda",
    description: "Demissão ou Queda de Faturamento",
    icon: TrendingDown,
    color: "from-red-500 to-orange-500",
  },
  {
    type: ScenarioType.NEW_RECURRING,
    title: "Nova Mensalidade",
    description: "Assinatura, Escola, Aluguel",
    icon: Repeat,
    color: "from-purple-500 to-pink-500",
  },
  {
    type: ScenarioType.EMERGENCY,
    title: "Emergência",
    description: "Gasto Imprevisto Imediato",
    icon: AlertOctagon,
    color: "from-yellow-500 to-amber-500",
  },
];

export function ScenarioSelector({ selected, onSelect }: ScenarioSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {scenarios.map((scenario) => (
        <motion.button
          key={scenario.type}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(scenario.type)}
          className={cn(
            "relative p-6 rounded-2xl border text-left transition-all duration-300 overflow-hidden group h-full",
            selected === scenario.type
              ? "bg-white/10 border-[#32d6a5] shadow-[0_0_20px_rgba(50,214,165,0.2)]"
              : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
          )}
        >
          <div
            className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-linear-to-br",
              scenario.color
            )}
          />
          
          <div className={cn(
              "p-3 rounded-xl w-fit mb-4 bg-linear-to-br",
              selected === scenario.type ? scenario.color : "from-white/10 to-transparent text-gray-400 group-hover:text-white"
          )}>
            <scenario.icon size={24} className={selected === scenario.type ? "text-white" : ""} />
          </div>

          <h3 className={cn("text-lg font-bold mb-1", selected === scenario.type ? "text-white" : "text-gray-300 group-hover:text-white")}>
            {scenario.title}
          </h3>
          <p className="text-xs text-gray-500 group-hover:text-gray-400">
            {scenario.description}
          </p>

          {selected === scenario.type && (
            <motion.div
              layoutId="selector-indicator"
              className="absolute inset-0 border-2 border-[#32d6a5] rounded-2xl pointer-events-none"
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}
