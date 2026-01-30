"use client";

import { useEffect, useState } from "react";
import { getAdminStats, AdminStats } from "@/services/admin.actions";
import { Card } from "@/components/ui/Card";
import { Loader2, Users, CreditCard, DollarSign, Activity } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getAdminStats();
      setStats(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin text-[#32d6a5] w-8 h-8" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Visão Geral</h1>
        <p className="text-gray-400">Monitoramento em tempo real do Miu Controle.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <Card className="p-6 bg-linear-to-br from-[#0b1215] to-[#131f24] border-white/5">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-400">Usuários Totais</p>
                    <h3 className="text-3xl font-bold text-white mt-2">{stats.totalUsers}</h3>
                </div>
                <div className="p-3 bg-[#32d6a5]/10 rounded-lg">
                    <Users className="text-[#32d6a5]" size={24} />
                </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-green-400">
                <Activity size={12} className="mr-1" />
                <span>+12% este mês</span>
            </div>
        </Card>

        {/* Active Subs */}
        <Card className="p-6 bg-linear-to-br from-[#0b1215] to-[#131f24] border-white/5">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-400">Assinaturas Ativas</p>
                    <h3 className="text-3xl font-bold text-white mt-2">{stats.activeSubscriptions}</h3>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg">
                    <CreditCard className="text-blue-500" size={24} />
                </div>
            </div>
             <div className="mt-4 flex items-center text-xs text-gray-500">
                <span>Conversão: {((stats.activeSubscriptions / stats.totalUsers) * 100).toFixed(1)}%</span>
            </div>
        </Card>

        {/* Revenue - MRR */}
        <Card className="p-6 bg-linear-to-br from-[#0b1215] to-[#131f24] border-white/5">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-400">Receita Mensal (MRR)</p>
                    <h3 className="text-3xl font-bold text-white mt-2">{formatCurrency(stats.totalRevenue)}</h3>
                </div>
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                    <DollarSign className="text-yellow-500" size={24} />
                </div>
            </div>
             <div className="mt-4 flex items-center text-xs text-green-400">
                <span>+5.2% vs mês anterior</span>
            </div>
        </Card>

        {/* Transaction Volume */}
        <Card className="p-6 bg-linear-to-br from-[#0b1215] to-[#131f24] border-white/5">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-400">Volume Transacionado</p>
                    <h3 className="text-3xl font-bold text-white mt-2">{formatCurrency(stats.transactionVolume)}</h3>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-lg">
                    <Activity className="text-purple-500" size={24} />
                </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-gray-500">
                <span>Total processado na plataforma</span>
            </div>
        </Card>
      </div>

      {/* Chart Placeholder */}
      <Card className="p-6 bg-[#0b1215] border-white/5 h-[300px] flex items-center justify-center text-gray-500 border-dashed border-2">
            <div className="text-center">
                <Activity size={48} className="mx-auto mb-4 opacity-50" />
                <p>Gráfico de crescimento de usuários (Em Breve)</p>
            </div>
      </Card>
    </div>
  );
}
