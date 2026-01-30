"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils"; // Default BRL/pt-BR
import { AnalysisInsight, MetricType } from "@/types/api";
import { Card } from "@/components/ui/Card";
import { Lightbulb, TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface SmartMetricCardProps {
  label: string;
  value: number;
  type: MetricType;
  isCurrency?: boolean;
  insight?: AnalysisInsight;
  colorClass: string;
  icon: React.ReactNode;
}

export function SmartMetricCard({
  label,
  value,
  type,
  isCurrency = true,
  insight,
  colorClass,
  icon
}: SmartMetricCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedValue = isCurrency 
    ? formatCurrency(value)
    : `${value.toFixed(1)}%`;

  return (
    <Card 
        className={cn(
            "relative overflow-hidden transition-all duration-300 border border-white/5 cursor-pointer group", 
            isExpanded ? "bg-[#1a2327]" : "bg-[#0b1215] hover:bg-[#131f24]"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-gray-400 mb-1">{label}</p>
                <h3 className="text-3xl font-bold text-white">{formattedValue}</h3>
            </div>
            <div className={cn("p-3 rounded-lg bg-opacity-20", colorClass)}>
                {icon}
            </div>
        </div>

        {/* Insight Teaser */}
        {insight && !isExpanded && (
             <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 group-hover:text-white transition-colors">
                <Lightbulb size={14} className={insight.type === 'POSITIVE' ? 'text-green-400' : 'text-yellow-400'} />
                <span>{insight.message}</span>
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
             </div>
        )}
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && insight && (
            <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-6 pb-6 bg-[#131f24]/50 border-t border-white/5"
            >
                <div className="pt-4 space-y-3">
                     <div className="flex items-start gap-3">
                        <div className="mt-1">
                            {insight.type === 'POSITIVE' && <TrendingUp className="text-green-400" size={16} />}
                            {insight.type === 'NEGATIVE' && <TrendingDown className="text-red-400" size={16} />}
                            {(insight.type === 'WARNING' || insight.type === 'NEUTRAL') && <Minus className="text-yellow-400" size={16} />}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white leading-tight">{insight.message}</p>
                            <p className="text-xs text-gray-400 mt-1 leading-relaxed">{insight.explanation}</p>
                        </div>
                     </div>
                     
                     {insight.actionItem && (
                         <div className="mt-2 text-xs bg-[#32d6a5]/10 text-[#32d6a5] p-3 rounded-lg border border-[#32d6a5]/20 font-medium">
                             💡 Sugestão: {insight.actionItem}
                         </div>
                     )}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
      
       {/* Active Indicator Strip */}
       {isExpanded && (
           <motion.div 
             layoutId="activeStrip"
             className={cn("absolute bottom-0 left-0 w-full h-1", 
                type === 'INCOME' ? 'bg-green-500' : 
                type === 'EXPENSE' ? 'bg-red-500' : 
                type === 'BALANCE' ? 'bg-blue-500' : 'bg-purple-500'
             )}
           />
       )}
    </Card>
  );
}
