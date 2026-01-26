import { MonthlyTrendResponse } from "@/types/api";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TrendChartProps {
  data: MonthlyTrendResponse;
}

export function TrendChart({ data }: TrendChartProps) {
  const chartData = data.months.map((m) => ({
    ...m,
    formattedDate: format(parseISO(m.month + "-01"), "MMM yy", { locale: ptBR }),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0f172a] border border-white/10 p-3 rounded-lg shadow-xl text-sm">
          <p className="text-gray-400 mb-2 capitalize">{label}</p>
          <div className="space-y-1">
             <p className="text-[#32d6a5]">
              Receita: <span className="font-bold">{formatCurrency(payload[0].value)}</span>
            </p>
             <p className="text-red-400">
              Despesa: <span className="font-bold">{formatCurrency(payload[1].value)}</span>
            </p>
             <div className="pt-2 mt-2 border-t border-white/10">
               <p className="text-white">
                 Saldo: <span className="font-bold">{formatCurrency(payload[0].value - payload[1].value)}</span>
               </p>
             </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm h-full">
      <h3 className="text-lg font-bold text-white mb-6">Tendência Mensal</h3>
      
      {chartData.length > 0 ? (
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="formattedDate" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <YAxis 
                hide 
              />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar 
                dataKey="income" 
                name="Receitas" 
                fill="#32d6a5" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={40}
              />
              <Bar 
                dataKey="expense" 
                name="Despesas" 
                fill="#f87171" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-[300px] flex items-center justify-center text-gray-500">
          Sem dados para exibir
        </div>
      )}
    </div>
  );
}
