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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: category.color || "#00404f" }}
            >
              {Icon && <Icon size={20} />}
            </div>
            <DialogTitle className="text-xl">
              Estatísticas: {category.name}
            </DialogTitle>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p>Carregando estatísticas...</p>
          </div>
        ) : stats ? (
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800">
                <div className="flex flex-col">
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium uppercase flex items-center gap-1">
                    <DollarSign size={12} /> Total Gasto
                  </span>
                  <span className="text-lg font-bold text-blue-900 dark:text-blue-100 mt-1">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(stats.totalAmount)}
                  </span>
                </div>
              </Card>

              <Card className="p-4 bg-purple-50 border-purple-100 dark:bg-purple-900/20 dark:border-purple-800">
                <div className="flex flex-col">
                  <span className="text-xs text-purple-600 dark:text-purple-400 font-medium uppercase flex items-center gap-1">
                    <Activity size={12} /> Transações
                  </span>
                  <span className="text-lg font-bold text-purple-900 dark:text-purple-100 mt-1">
                    {stats.totalTransactions}
                  </span>
                </div>
              </Card>

              <Card className="p-4 bg-green-50 border-green-100 dark:bg-green-900/20 dark:border-green-800">
                <div className="flex flex-col">
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium uppercase flex items-center gap-1">
                    <TrendingUp size={12} /> Média
                  </span>
                  <span className="text-lg font-bold text-green-900 dark:text-green-100 mt-1">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(stats.averageAmount)}
                  </span>
                </div>
              </Card>
            </div>

            <div className="h-[250px] w-full">
              <h4 className="text-sm font-medium mb-4 text-gray-500">
                Histórico Mensal
              </h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) =>
                      new Intl.NumberFormat("pt-BR", {
                        notation: "compact",
                        compactDisplay: "short",
                      }).format(value)
                    }
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{ borderRadius: "8px" }}
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
                    fill={category.color || "#00404f"}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Não foi possível carregar os dados.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
