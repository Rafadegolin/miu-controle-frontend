"use client";

import { SimulationResult } from "@/types/scenarios";
import { formatCurrency } from "@/lib/utils";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface SimulationResultProps {
  result: SimulationResult;
}

export function SimulationResultDisplay({ result }: SimulationResultProps) {
  const data = result.baselineProjection.map((val, i) => ({
    month: `M${i + 1}`,
    baseline: val,
    projected: result.projectedBalance12Months[i],
  }));

  const isViable = result.isViable;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Viability Banner */}
      <div
        className={`p-6 rounded-2xl border ${
          isViable
            ? "bg-green-500/10 border-green-500/20"
            : "bg-red-500/10 border-red-500/20"
        } flex items-center justify-between`}
      >
        <div className="flex items-center gap-4">
            <div className={`p-4 rounded-full ${isViable ? "bg-green-500/20" : "bg-red-500/20"}`}>
                {isViable ? <CheckCircle className="text-green-500" size={32} /> : <AlertTriangle className="text-red-500" size={32} />}
            </div>
            <div>
                <h3 className={`text-xl font-bold ${isViable ? "text-green-400" : "text-red-400"}`}>
                    {isViable ? "Cenário Viável" : "Cenário de Risco"}
                </h3>
                <p className="text-gray-400 text-sm">
                    {isViable
                        ? "O impacto no seu fluxo de caixa é sustentável."
                        : "Esta decisão pode comprometer seu saldo futuro."}
                </p>
            </div>
        </div>
        <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Menor Saldo</p>
            <p className={`text-2xl font-bold ${result.lowestBalance >= 0 ? "text-white" : "text-red-500"}`}>
                {formatCurrency(result.lowestBalance)}
            </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px] w-full bg-white/5 rounded-2xl p-4 border border-white/5">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#32d6a5" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#32d6a5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isViable ? "#3b82f6" : "#ef4444"} stopOpacity={0.3} />
                <stop offset="95%" stopColor={isViable ? "#3b82f6" : "#ef4444"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `R$${val/1000}k`} />
            <Tooltip
              contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
              itemStyle={{ fontSize: "12px" }}
              formatter={(val: number) => formatCurrency(val)}
            />
            <Area
              type="monotone"
              dataKey="baseline"
              stroke="#32d6a5"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorBaseline)"
              name="Cenário Atual"
            />
            <Area
              type="monotone"
              dataKey="projected"
              stroke={isViable ? "#3b82f6" : "#ef4444"}
              strokeDasharray="5 5"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorProjected)"
              name="Simulado"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/5 rounded-xl p-4">
             <h4 className="text-sm font-bold text-gray-400 mb-3 flex items-center gap-2">
                 <TrendingUp size={16} /> Insights
             </h4>
             <ul className="space-y-2">
                 {result.recommendations.map((rec, i) => (
                     <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-[#32d6a5] mt-1.5 shrink-0" />
                         {rec}
                     </li>
                 ))}
             </ul>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-center items-center text-center">
              <p className="text-gray-400 text-sm mb-2">Impacto Total em 12 Meses</p>
              <p className="text-3xl font-bold text-white">
                  {formatCurrency(result.projectedBalance12Months[11] - result.baselineProjection[11])}
              </p>
          </div>
      </div>
    </motion.div>
  );
}
