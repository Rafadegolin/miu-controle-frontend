"use client";

import { useState } from "react";
import { useDashboard } from "@/hooks/useDashboard";
import { CreateTransactionModal } from "@/components/transactions/CreateTransactionModal";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import {
  Calendar,
  Plus,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { data, isLoading, refetch } = useDashboard();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="grid grid-cols-12 gap-6 animate-fade-in-up">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-2">
               <Skeleton className="h-8 w-48" />
               <Skeleton className="h-4 w-64" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-9 w-28" />
                <Skeleton className="h-9 w-36" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Skeleton className="h-64 w-full rounded-xl" />
             <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
             <Skeleton className="h-80 w-full rounded-xl" />
             <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  const {
    accountsSummary,
    currentMonth,
    goals,
    budgets,
    upcomingRecurring,
    insights,
  } = data || {};

  const totalBalance = accountsSummary?.totalBalance || 0;
  const totalIncome = currentMonth?.income || 0;
  const totalExpense = currentMonth?.expense || 0;



  return (
    <div className="grid grid-cols-12 gap-6 animate-fade-in-up">
      {/* Hero Area */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#00404f]">Dashboard</h1>
            <p className="text-[#3c88a0] font-medium">
              Visão geral das suas finanças.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="bg-white">
              <Calendar size={16} /> Mês Atual
            </Button>
            <Button 
                variant="primary" 
                size="sm"
                onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus size={16} /> Nova Transação
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-[#00404f] text-white border-none! relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#3c88a0] opacity-20 blur-2xl rounded-full group-hover:opacity-30 transition-opacity"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Wallet size={20} />
                </div>
                {/* <span className="text-[#7cddb1] bg-[#7cddb1]/10 px-2 py-0.5 rounded text-xs font-bold">
                  +12%
                </span> */}
              </div>
              <p className="text-[#3c88a0] text-sm">Saldo Total</p>
              <h3 className="text-2xl font-bold text-white">
                {formatCurrency(totalBalance)}
              </h3>
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-[#7cddb1]/20 text-[#007459] rounded-lg">
                <ArrowUpRight size={20} />
              </div>
            </div>
            <p className="text-[#00404f]/60 text-sm">Receitas (Mês)</p>
            <h3 className="text-2xl font-bold text-[#00404f]">
              {formatCurrency(totalIncome)}
            </h3>
          </Card>

          <Card>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-[#ff6b6b]/20 text-[#ff6b6b] rounded-lg">
                <ArrowDownRight size={20} />
              </div>
            </div>
            <p className="text-[#00404f]/60 text-sm">Despesas (Mês)</p>
            <h3 className="text-2xl font-bold text-[#00404f]">
              {formatCurrency(totalExpense)}
            </h3>
          </Card>
        </div>

        {/* Insights / Metas (Substituindo Gráfico temporariamente) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <h3 className="text-lg font-bold text-[#00404f] mb-4">Insights</h3>
            <div className="space-y-4">
              {insights?.map((insight: any, index: number) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">{insight.icon}</span>
                  <div>
                    <h4 className="font-bold text-sm text-[#00404f]">{insight.title}</h4>
                    <p className="text-xs text-gray-600">{insight.message}</p>
                  </div>
                </div>
              ))}
              {(!insights || insights.length === 0) && (
                <p className="text-sm text-gray-500">Sem insights no momento.</p>
              )}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-[#00404f] mb-4">Metas Ativas</h3>
            <div className="space-y-4">
              {goals?.active?.slice(0, 3).map((goal: any) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-[#00404f]">{goal.icon} {goal.name}</span>
                    <span className="text-gray-500">{goal.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#00404f] rounded-full" 
                      style={{ width: `${goal.progress}%`, backgroundColor: goal.color }}
                    />
                  </div>
                </div>
              ))}
               {(!goals?.active || goals.active.length === 0) && (
                <p className="text-sm text-gray-500">Nenhuma meta ativa.</p>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Sidebar Area (Widgets) */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <Card className="flex flex-col items-center py-8">
          <h3 className="text-[#00404f] font-bold mb-4">Orçamentos</h3>
          
          <div className="w-full space-y-4">
             {budgets?.items?.slice(0, 4).map((budget: any) => (
                 <div key={budget.id} className="flex items-center gap-3">
                     <div className="p-2 rounded-lg bg-gray-100" style={{ color: budget.categoryColor }}>
                         {budget.categoryIcon}
                     </div>
                     <div className="flex-1">
                         <div className="flex justify-between text-xs mb-1">
                             <span className="font-medium text-[#00404f]">{budget.categoryName}</span>
                             <span className="text-gray-500">R$ {budget.amount}</span>
                         </div>
                         <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                             <div 
                                 className="h-full rounded-full" 
                                 style={{ width: `${Math.min(budget.percentage, 100)}%`, backgroundColor: budget.categoryColor }}
                             />
                         </div>
                     </div>
                 </div>
             ))}
             {(!budgets?.items || budgets.items.length === 0) && (
                <p className="text-sm text-center text-gray-500">Nenhum orçamento definido.</p>
             )}
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[#00404f]">Próximos Recorrentes</h3>
          </div>
          <div className="space-y-3">
            {upcomingRecurring && upcomingRecurring.length > 0 ? (
              upcomingRecurring.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-blue-100/50 text-blue-600 rounded-lg">
                        <Calendar size={16} />
                     </div>
                     <div>
                       <p className="text-sm font-medium text-[#00404f]">{item.description}</p>
                       <p className="text-xs text-gray-500">Vence em {item.daysUntil} dias</p>
                     </div>
                  </div>
                  <span className={`text-sm font-bold ${item.type === 'EXPENSE' ? 'text-red-500' : 'text-green-500'}`}>
                    {item.type === 'EXPENSE' ? '-' : '+'} {formatCurrency(item.amount)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                Nenhuma conta próxima.
              </p>
            )}
          </div>
        </Card>
      </div>
      
      <CreateTransactionModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSuccess={() => refetch()}
      />
    </div>
  );
}
