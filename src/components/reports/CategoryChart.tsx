import { CategoryAnalysisResponse } from "@/types/api";
import { formatCurrency } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface CategoryChartProps {
  data: CategoryAnalysisResponse;
}

export function CategoryChart({ data }: CategoryChartProps) {
  const chartData = data.categories.map((cat) => ({
    name: cat.categoryName,
    value: cat.total,
    color: cat.categoryColor || "#gray",
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0f172a] border border-white/10 p-3 rounded-lg shadow-xl">
          <p className="text-white font-medium mb-1">{payload[0].name}</p>
          <p className="text-[#32d6a5] font-bold">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm h-full">
      <h3 className="text-lg font-bold text-white mb-6">Gastos por Categoria</h3>
      
      {chartData.length > 0 ? (
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
               <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
               />
            </PieChart>
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
