"use client";

import { useEffect, useState } from "react";
import { getHealthScore } from "@/services/health-score.actions";
import { getEmergencyFundStatus } from "@/services/emergency-fund.actions";
import { FinancialHealthResponse, EmergencyFund } from "@/types/api";
import { Loader2 } from "lucide-react";
import { ScoreGauge } from "@/components/health/ScoreGauge";
import { PilarCard } from "@/components/health/PilarCard";
import { AiInsightCard } from "@/components/health/AiInsightCard";
import { EmergencyFundWidget } from "@/components/financial-health/EmergencyFundWidget";
import styles from "@/components/dashboard/styles/Dashboard.module.css";
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
  const [fundData, setFundData] = useState<EmergencyFund | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const [healthRes, fundRes] = await Promise.all([
          getHealthScore(),
          getEmergencyFundStatus()
      ]);
      setData(healthRes);
      setFundData(fundRes);
    } catch (err) {
      console.error("Failed to load health data", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
     return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#32d6a5]" /></div>;
  }

  if (!data) return null;

  return (
    <div className="space-y-8 animate-fade-in-up pb-10 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white">Saúde Financeira</h2>
        <p className="text-gray-400">Seu score de saúde financeira atualizado diariamente.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Score & Widgets */}
        <div className="space-y-8">
            <div className={`${styles.glassCard} p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[400px]`}>
                 <ScoreGauge score={data.score} level={data.level} />
            </div>

            {/* Emergency Fund Widget (New) */}
            {fundData && (
                <EmergencyFundWidget 
                    fund={fundData} 
                    onUpdate={load} 
                />
            )}

            {/* AI Insight Card */}
            {data.insight && <AiInsightCard insight={data.insight} />}
        </div>

        {/* Right Column: Pillars & History */}
         <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white pl-1">Os 5 Pilares</h3>
                <div className="grid grid-cols-1 gap-4">
                    <PilarCard pilar={data.pilars.consistency} />
                    <PilarCard pilar={data.pilars.budget} />
                    <PilarCard pilar={data.pilars.goals} />
                    <PilarCard pilar={data.pilars.emergencyFund} />
                    <PilarCard pilar={data.pilars.diversification} />
                </div>
            </div>

             {/* History Chart */}
            <div className={`${styles.glassCard} p-6`}>
                <h4 className="font-bold text-white mb-6">Evolução do Score (30 dias)</h4>
                <div className="h-[200px] w-full">
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
                            interval={4}
                        />
                        <YAxis hide domain={[0, 1000]} />
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
      </div>
    </div>
  );
}
