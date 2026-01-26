"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
} from "recharts";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { ProjectionMonth } from "@/types/api";

interface CashFlowChartProps {
  data: ProjectionMonth[];
}

export function CashFlowChart({ data }: CashFlowChartProps) {
  const chartData = data.map((item) => ({
    date: item.date,
    dateFormatted: format(new Date(item.date), "MMM yyyy", { locale: ptBR }),
    realistic: item.balance.accumulated,
    optimistic: item.scenarios.optimistic,
    pessimistic: item.scenarios.pessimistic,
    range: [item.scenarios.pessimistic, item.scenarios.optimistic], // Used for area range if supported, otherwise separate areas
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0f172a]/90 border border-white/10 p-3 rounded-lg backdrop-blur-md shadow-xl text-sm">
          <p className="font-bold text-white mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-[#32d6a5]" />
               <span className="text-[#32d6a5]">Otimista:</span>
               <span className="text-white font-mono ml-auto">
                 {payload.find((p: any) => p.dataKey === "optimistic")?.value?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
               </span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-blue-400" />
               <span className="text-blue-400">Realista:</span>
               <span className="text-white font-mono ml-auto">
                 {payload.find((p: any) => p.dataKey === "realistic")?.value?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
               </span>
            </div>
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-red-400" />
               <span className="text-red-400">Pessimista:</span>
               <span className="text-white font-mono ml-auto">
                 {payload.find((p: any) => p.dataKey === "pessimistic")?.value?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
               </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRange" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#32d6a5" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#32d6a5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} vertical={false} />
          <XAxis 
            dataKey="dateFormatted" 
            stroke="#94a3b8" 
            tick={{ fontSize: 12 }} 
            tickMargin={10}
            axisLine={false}
          />
          <YAxis 
            stroke="#94a3b8" 
            tick={{ fontSize: 12 }} 
            tickFormatter={(val) => 
                val.toLocaleString("pt-BR", { style: "currency", currency: "BRL", notation: "compact" })
            }
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Pessimistic Area (Background) */}
           <Area
            type="monotone"
            dataKey="pessimistic"
            stroke="#f87171"
            strokeWidth={1}
            strokeDasharray="5 5"
            fill="transparent"
            activeDot={false}
          />

          {/* Optimistic Area (Background) */}
           <Area
            type="monotone"
            dataKey="optimistic"
            stroke="#32d6a5"
            strokeWidth={1}
            strokeDasharray="5 5"
            fill="url(#colorRange)"
            activeDot={false}
          />

          {/* Realistic Line (Main) */}
          <Area
              type="monotone"
              dataKey="realistic"
              stroke="#60a5fa"
              strokeWidth={3}
              fill="transparent"
              dot={{ fill: "#60a5fa", strokeWidth: 2, r: 4 }}
          />

        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
