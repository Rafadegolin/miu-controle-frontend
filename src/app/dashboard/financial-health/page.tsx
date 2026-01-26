"use client";

import { useEffect, useState } from "react";
import { aiAnalyticsActions } from "@/services/ai-analytics.actions";
import { FinancialHealthResponse } from "@/types/api";
import { Loader2, Trophy, Target, TrendingUp, ShieldCheck } from "lucide-react";
import styles from "@/components/dashboard/styles/Dashboard.module.css";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";

export default function FinancialHealthPage() {
  const [data, setData] = useState<FinancialHealthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await aiAnalyticsActions.getFinancialHealth();
        setData(res);
      } catch (err) {
        console.error("Failed to load health", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
     return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#32d6a5]" /></div>;
  }

  if (!data) return null;

  const getLevelColor = (level: string) => {
    switch(level) {
      case "DIAMANTE": return "text-[#b9f2ff] drop-shadow-[0_0_10px_rgba(185,242,255,0.8)]";
      case "PLATINA": return "text-[#e5e4e2] drop-shadow-[0_0_10px_rgba(229,228,226,0.8)]";
      case "OURO": return "text-[#ffd700] drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]";
      case "PRATA": return "text-[#c0c0c0]";
      default: return "text-[#cd7f32]";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up pb-10">
      <div>
        <h2 className="text-2xl font-bold text-white">Saúde Financeira</h2>
        <p className="text-gray-400">Análise profunda da sua estabilidade e hábitos.</p>
      </div>

      {/* Hero Score Card */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#0f172a] to-[#06181b] border border-white/10 p-8 text-center">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10"></div>
         <div className="relative z-10 flex flex-col items-center">
            <Trophy className={`w-16 h-16 mb-4 ${getLevelColor(data.level)}`} />
            <h3 className={`text-4xl font-extrabold mb-1 ${getLevelColor(data.level)}`}>{data.level}</h3>
            <div className="text-6xl font-bold text-white mb-2">{data.score}</div>
            <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
               <div className="h-full bg-[#32d6a5]" style={{ width: `${data.score}%` }}></div>
            </div>
            <p className="text-gray-400 text-sm mt-3 max-w-md mx-auto">
              {data.score >= 80 ? "Excelente! Você domina suas finanças." : 
               data.score >= 60 ? "Muito bom! Continue assim." :
               "Há espaço para melhorias importantes."}
            </p>
         </div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className={`${styles.glassCard} p-6`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <Target size={24} />
              </div>
              <h4 className="font-bold text-white">Taxa de Poupança</h4>
            </div>
            <p className="text-3xl font-bold text-white mb-2">{Number(data.breakdown.savingsRate).toFixed(1)}%</p>
            <p className="text-xs text-gray-500">Do seu dinheiro que sobra no fim do mês.</p>
            <Progress value={Math.min(Number(data.breakdown.savingsRate) * 5, 100)} className="h-1 mt-4" /> 
            {/* *5 roughly assumes 20% is perfect score */}
         </div>

         <div className={`${styles.glassCard} p-6`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-bold text-white">Consistência</h4>
            </div>
            <p className="text-3xl font-bold text-white mb-2">
                {typeof data.breakdown.consistency === 'object' 
                  ? (data.breakdown.consistency as any).score 
                  : data.breakdown.consistency}/100
            </p>
            <p className="text-xs text-gray-500">Estabilidade dos seus gastos mensais.</p>
            <Progress 
                value={typeof data.breakdown.consistency === 'object' 
                  ? (data.breakdown.consistency as any).score 
                  : data.breakdown.consistency} 
                className="h-1 mt-4" 
            />
         </div>

         <div className={`${styles.glassCard} p-6`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                <TrendingUp size={24} />
              </div>
              <h4 className="font-bold text-white">Saúde Orçamentária</h4>
            </div>
             <p className="text-3xl font-bold text-white mb-2">
                {typeof data.breakdown.budgetHealth === 'object' 
                  ? (data.breakdown.budgetHealth as any).score 
                  : data.breakdown.budgetHealth}/100
             </p>
             <p className="text-xs text-gray-500">Respeito aos limites definidos.</p>
             <Progress 
                value={typeof data.breakdown.budgetHealth === 'object' 
                  ? (data.breakdown.budgetHealth as any).score 
                  : data.breakdown.budgetHealth} 
                className="h-1 mt-4" 
             />
         </div>
      </div>

      {/* History Chart */}
      <div className={`${styles.glassCard} p-6`}>
        <h4 className="font-bold text-white mb-6">Evolução do Score</h4>
        <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.history}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#32d6a5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#32d6a5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(val) => format(parseISO(val), "dd/MM")}
                  stroke="#64748b" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#32d6a5" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
