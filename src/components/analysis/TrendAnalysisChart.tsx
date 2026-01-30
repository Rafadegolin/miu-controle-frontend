"use client";

import { Card } from "@/components/ui/Card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { month: 'Jan', income: 4000, expense: 2400 },
  { month: 'Fev', income: 3000, expense: 1398 },
  { month: 'Mar', income: 2000, expense: 9800 }, // Outlier
  { month: 'Abr', income: 2780, expense: 3908 },
  { month: 'Mai', income: 1890, expense: 4800 },
  { month: 'Jun', income: 2390, expense: 3800 },
];

export function TrendAnalysisChart() {
  return (
    <Card className="p-6 bg-[#0b1215] border border-white/5 h-[350px]">
      <div className="mb-6 flex justify-between items-center">
        <div>
            <h3 className="text-lg font-bold text-white">Fluxo de Caixa & Tendências</h3>
            <p className="text-xs text-gray-400">Comparativo histórico dos últimos 6 meses</p>
        </div>
        <div className="flex gap-4 text-xs font-bold">
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#32d6a5]" /> Receitas
            </div>
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" /> Despesas
            </div>
        </div>
      </div>

      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#32d6a5" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#32d6a5" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis 
                dataKey="month" 
                tick={{fontSize: 12, fill: "#6b7280"}} 
                axisLine={false}
                tickLine={false}
            />
            <YAxis hide />
            <Tooltip 
                contentStyle={{ backgroundColor: '#1a2327', borderColor: '#374151', color: '#fff' }}
                itemStyle={{ fontSize: '12px' }}
                formatter={(value: number) => [`R$ ${value}`, '']}
            />
            <Area 
                type="monotone" 
                dataKey="income" 
                stroke="#32d6a5" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorIncome)" 
            />
            <Area 
                type="monotone" 
                dataKey="expense" 
                stroke="#ef4444" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorExpense)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
