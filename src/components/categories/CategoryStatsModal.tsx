import { useEffect, useState } from "react";
import { Category, CategoryStats } from "@/types/api";
import api from "@/services/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { resolveCategoryIcon } from "./CategoryIconSelector";
import { Loader2, TrendingUp, DollarSign, Activity } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/Card";

interface CategoryStatsModalProps {
  category: Category | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CategoryStatsModal({
  category,
  isOpen,
  onClose,
}: CategoryStatsModalProps) {
  const [stats, setStats] = useState<CategoryStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && category) {
      loadStats();
    }
  }, [isOpen, category]);

  const loadStats = async () => {
    if (!category) return;
    setIsLoading(true);
    try {
      const data = await api.getCategoryStats(category.id);
      setStats(data);
    } catch (error) {
      console.error("Failed to load category stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!category) return null;

  const Icon = resolveCategoryIcon(category.icon);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] bg-[#06181b] border border-white/10 text-white shadow-2xl shadow-black/50">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg ring-1 ring-white/10"
              style={{ backgroundColor: category.color || "#06181b" }}
            >
              {Icon && <Icon size={24} />}
            </div>
            <div>
                 <DialogTitle className="text-xl font-bold text-white">
                    {category.name}
                </DialogTitle>
                 <p className="text-sm text-gray-400">Análise de histórico</p>
            </div>
           
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-10 h-10 animate-spin mb-3 text-[#32d6a5]" />
            <p>Carregando estatísticas...</p>
          </div>
        ) : stats ? (
          <div className="space-y-8 py-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex flex-col">
                  <span className="text-xs text-blue-300 font-medium uppercase flex items-center gap-1 mb-2">
                    <DollarSign size={14} className="text-blue-400" /> Total
                  </span>
                  <span className="text-lg font-bold text-white">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(stats.totalAmount)}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex flex-col">
                  <span className="text-xs text-purple-300 font-medium uppercase flex items-center gap-1 mb-2">
                    <Activity size={14} className="text-purple-400" /> Transações
                  </span>
                  <span className="text-lg font-bold text-white">
                    {stats.totalTransactions}
                  </span>
                </div>
              </div>

               <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex flex-col">
                  <span className="text-xs text-[#32d6a5] font-medium uppercase flex items-center gap-1 mb-2">
                    <TrendingUp size={14} /> Média
                  </span>
                  <span className="text-lg font-bold text-white">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(stats.averageAmount)}
                  </span>
                </div>
              </div>
            </div>

            <div className="h-[300px] w-full bg-white/5 rounded-xl border border-white/10 p-4">
              <h4 className="text-sm font-medium mb-6 text-gray-400 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#32d6a5]" />
                Histórico Mensal
              </h4>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={stats.monthlyTrend} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                  <XAxis
                    dataKey="month"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    stroke="#9ca3af"
                    dy={10}
                  />
                  <YAxis
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    stroke="#9ca3af"
                    tickFormatter={(value) =>
                      new Intl.NumberFormat("pt-BR", {
                        notation: "compact",
                        compactDisplay: "short",
                      }).format(value)
                    }
                  />
                  <Tooltip
                    cursor={{ fill: "#ffffff05" }}
                    contentStyle={{ 
                        backgroundColor: "#06181b", 
                        border: "1px solid rgba(255,255,255,0.1)", 
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                        color: "#fff"
                    }}
                    itemStyle={{ color: "#fff" }}
                    formatter={(value: number) => [
                      new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(value),
                      "Valor",
                    ]}
                  />
                  <Bar
                    dataKey="amount"
                    fill={category.color || "#32d6a5"}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={50}
                    className="opacity-90 hover:opacity-100 transition-opacity"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            Não foi possível carregar os dados.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
