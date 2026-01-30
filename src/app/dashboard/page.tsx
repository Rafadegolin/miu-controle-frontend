"use client";

import { useState } from "react";
import { useDashboard } from "@/hooks/useDashboard";
import { CreateTransactionModal } from "@/components/transactions/CreateTransactionModal";
import { AiForecastCard } from "@/components/dashboard/AiForecastCard";
import { AiAnomaliesWidget } from "@/components/dashboard/AiAnomaliesWidget";
import { formatCurrency } from "@/lib/utils";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  MoreHorizontal,
  TrendingUp,
  CreditCard,
  ShoppingBag,
  Coffee,
  Car,
  Home
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import styles from "@/components/dashboard/styles/Dashboard.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid
} from "recharts";

// Mock Data for Charts
const rhythmData = [
  { day: "1", current: 120, last: 140 },
  { day: "5", current: 300, last: 200 },
  { day: "10", current: 180, last: 220 },
  { day: "15", current: 450, last: 380 },
  { day: "20", current: 250, last: 400 },
  { day: "25", current: 320, last: 280 },
  { day: "30", current: 400, last: 350 },
];

const netWorthData = [
  { month: "Jan", value: 5000 },
  { month: "Fev", value: 7500 },
  { month: "Mar", value: 6800 },
  { month: "Abr", value: 9200 },
  { month: "Mai", value: 11000 },
  { month: "Jun", value: 13500 },
];

const topCategories = [
  { id: 1, name: "Alimentação", amount: 1250.00, diff: 12, icon: Coffee, color: "#fca5a5" },
  { id: 2, name: "Compras", amount: 850.50, diff: -5, icon: ShoppingBag, color: "#86efac" },
  { id: 3, name: "Transporte", amount: 450.20, diff: 2, icon: Car, color: "#93c5fd" },
  { id: 4, name: "Moradia", amount: 2200.00, diff: 0, icon: Home, color: "#fdba74" },
];

const recentTransactions = [
  { id: 1, desc: "Netflix Assinatura", category: "Entretenimento", amount: -55.90, date: "Hoje", icon: CreditCard },
  { id: 2, desc: "Spotify Premium", category: "Entretenimento", amount: -21.90, date: "Ontem", icon: CreditCard },
  { id: 3, desc: "Salário Mensal", category: "Renda", amount: 5200.00, date: "25 Out", icon: Wallet, type: 'income' },
  { id: 4, desc: "Uber Viagem", category: "Transporte", amount: -24.50, date: "24 Out", icon: Car },
];

import { ProactiveAlertsWidget } from "@/components/dashboard/ProactiveAlertsWidget";
import { CurrencyConverterWidget } from "@/components/dashboard/CurrencyConverterWidget";

export default function DashboardPage() {
  const { data, isLoading, refetch } = useDashboard();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  if (isLoading) {
    return (
      <div className={styles.gridContainer}>
        <div className={`${styles.glassCard} ${styles.colSpan12}`}>
           <Skeleton className="h-12 w-1/3 mb-4 bg-gray-700/50" />
           <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-32 w-full rounded-xl bg-gray-700/50" />
              <Skeleton className="h-32 w-full rounded-xl bg-gray-700/50" />
              <Skeleton className="h-32 w-full rounded-xl bg-gray-700/50" />
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gridContainer}>
      
      {/* ALERTS SECTION - Full Width */}
      <ProactiveAlertsWidget />
      
      {/* AI Section - Full Width */}
      <div className={`${styles.colSpan12} grid grid-cols-1 md:grid-cols-2 gap-6`}>
         <AiForecastCard />
         <AiAnomaliesWidget />
      </div>

      {/* KPI Cards */}
      <div className={`${styles.glassCard} ${styles.colSpan4}`}>
        <div className={styles.cardHeader}>
          <div className="p-2 bg-[#32d6a5]/10 rounded-lg text-[#32d6a5]">
            <Wallet size={24} />
          </div>
          <MoreHorizontal className="text-gray-500 cursor-pointer" size={20} />
        </div>
        <div className={styles.statLabel}>Saldo Total</div>
        <div className={styles.statRef}>
          <div className={styles.statValue}>{formatCurrency(totalBalance)}</div>
          <div className={`${styles.percentage} ${styles.positive}`}>+12%</div>
        </div>
      </div>

      <div className={`${styles.glassCard} ${styles.colSpan4}`}>
        <div className={styles.cardHeader}>
          <div className="p-2 bg-[#32d6a5]/10 rounded-lg text-[#32d6a5]">
             <ArrowUpRight size={24} />
          </div>
          <span className="text-xs text-gray-400">Este mês</span>
        </div>
        <div className={styles.statLabel}>Receitas</div>
        <div className={styles.statRef}>
          <div className={styles.statValue} style={{color: '#32d6a5'}}>{formatCurrency(totalIncome)}</div>
        </div>
      </div>

      <div className={`${styles.glassCard} ${styles.colSpan4}`}>
        <div className={styles.cardHeader}>
          <div className="p-2 bg-red-400/10 rounded-lg text-red-400">
             <ArrowDownRight size={24} />
          </div>
          <span className="text-xs text-gray-400">Este mês</span>
        </div>
        <div className={styles.statLabel}>Despesas</div>
        <div className={styles.statRef}>
          <div className={styles.statValue} style={{color: '#f87171'}}>{formatCurrency(totalExpense)}</div>
        </div>
      </div>

      {/* RITMO DE GASTOS (Mock) */}
      <div className={`${styles.glassCard} ${styles.colSpan8}`}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>
            <Calendar size={20} className="text-[#32d6a5]" />
            Ritmo de Gastos
          </div>
          <div className="flex gap-2">
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <div className="w-2 h-2 rounded-full bg-[#32d6a5]"></div> Atual
            </span>
             <span className="flex items-center gap-1 text-xs text-gray-400">
              <div className="w-2 h-2 rounded-full bg-gray-600"></div> Mês Anterior
            </span>
          </div>
        </div>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rhythmData} barGap={8}>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 12}} 
              />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                contentStyle={{background: '#06181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
              />
              <Bar dataKey="last" fill="#1f2937" radius={[4, 4, 0, 0]} barSize={12} />
              <Bar dataKey="current" fill="#32d6a5" radius={[4, 4, 0, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* INSIGHTS (Real) */}
      <div className={`${styles.glassCard} ${styles.colSpan4}`}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>Insights</div>
        </div>
        <div className={`flex flex-col gap-3 max-h-[300px] overflow-y-auto ${styles.customScroll} pr-2`}>
          {insights?.map((insight: any, index: number) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
              <span className="text-xl">{insight.icon}</span>
              <div>
                <h4 className="font-bold text-sm text-white mb-1">{insight.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{insight.message}</p>
              </div>
            </div>
          ))}
          {(!insights || insights.length === 0) && (
            <p className="text-sm text-gray-500 text-center py-4">Sem insights no momento.</p>
          )}
        </div>
      </div>

       {/* PATRIMÔNIO (Mock) */}
       <div className={`${styles.glassCard} ${styles.colSpan6}`}>
         <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>
              <TrendingUp size={20} className="text-[#32d6a5]" />
              Evolução Patrimonial
            </div>
            <select className="bg-transparent text-xs text-gray-400 border border-white/10 rounded px-2 py-1 outline-none">
              <option>Últimos 6 meses</option>
              <option>Este Ano</option>
            </select>
         </div>
         <div style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={netWorthData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#32d6a5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#32d6a5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip 
                 contentStyle={{background: '#06181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
              />
              <Area type="monotone" dataKey="value" stroke="#32d6a5" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
       </div>

       {/* ACTIVE GOALS (Real) */}
       <div className={`${styles.glassCard} ${styles.colSpan6}`}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>Metas Ativas</div>
          </div>
          <div className="space-y-4">
            {goals?.active?.slice(0, 3).map((goal: any) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-white flex items-center gap-2">
                    {goal.icon} {goal.name}
                  </span>
                  <span className="text-[#32d6a5] font-bold">{goal.progress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ width: `${goal.progress}%`, backgroundColor: goal.color || '#32d6a5', boxShadow: `0 0 10px ${goal.color || '#32d6a5'}` }}
                  />
                </div>
              </div>
            ))}
            {(!goals?.active || goals.active.length === 0) && (
              <p className="text-sm text-gray-500">Nenhuma meta ativa.</p>
            )}
          </div>
       </div>

       {/* ORÇAMENTOS (Real) */}
       <div className={`${styles.glassCard} ${styles.colSpan6}`}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>Orçamentos</div>
          </div>
          <div className="space-y-4">
             {budgets?.items?.slice(0, 4).map((budget: any) => (
                 <div key={budget.id} className="flex items-center gap-3">
                     <div className="p-2 rounded-lg bg-white/5" style={{ color: budget.categoryColor }}>
                         {budget.categoryIcon}
                     </div>
                     <div className="flex-1">
                         <div className="flex justify-between text-xs mb-1">
                             <span className="font-medium text-white">{budget.categoryName}</span>
                             <span className="text-gray-400">R$ {budget.amount}</span>
                         </div>
                         <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                             <div 
                                 className="h-full rounded-full" 
                                 style={{ width: `${Math.min(budget.percentage, 100)}%`, backgroundColor: budget.categoryColor }}
                             />
                         </div>
                     </div>
                 </div>
             ))}
             {(!budgets?.items || budgets.items.length === 0) && (
                <p className="text-sm text-gray-500">Nenhum orçamento definido.</p>
             )}
          </div>
       </div>

      {/* PRÓXIMOS RECORRENTES (Real) */}
      <div className={`${styles.glassCard} ${styles.colSpan6}`}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>Próximos Recorrentes</div>
        </div>
        <div className="space-y-2">
          {upcomingRecurring && upcomingRecurring.length > 0 ? (
            upcomingRecurring.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/5">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#32d6a5]/10 text-[#32d6a5] rounded-lg">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{item.description}</p>
                      <p className="text-xs text-gray-400">Vence em {item.daysUntil} dias</p>
                    </div>
                </div>
                <span className={`text-sm font-bold ${item.type === 'EXPENSE' ? 'text-red-400' : 'text-[#32d6a5]'}`}>
                  {item.type === 'EXPENSE' ? '-' : '+'} {formatCurrency(item.amount)}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 py-2">
              Nenhuma conta próxima.
            </p>
          )}
        </div>
      </div>

      {/* TOP CATEGORIES (Mock) */}
      <div className={`${styles.glassCard} ${styles.colSpan4}`}>
         <CurrencyConverterWidget />
      </div>

      <div className={`${styles.glassCard} ${styles.colSpan6}`}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>Top Categorias</div>
          <div className={styles.cardAction}>Ver todas</div>
        </div>
        <div className="flex flex-col gap-1">
          {topCategories.map((cat) => (
             <div key={cat.id} className={styles.listItem}>
               <div className={styles.listLeft}>
                 <div className={styles.itemIcon} style={{color: cat.color, background: `${cat.color}20`}}>
                    <cat.icon size={18} />
                 </div>
                 <div className={styles.itemInfo}>
                   <span className={styles.itemTitle}>{cat.name}</span>
                   <span className={styles.itemSub}>{cat.diff > 0 ? `+${cat.diff}%` : `${cat.diff}%`} vs mês ant.</span>
                 </div>
               </div>
               <div className={styles.itemValue}>{formatCurrency(cat.amount)}</div>
             </div>
          ))}
        </div>
      </div>

       {/* RECENT TRANSACTIONS (Mock) */}
       <div className={`${styles.glassCard} ${styles.colSpan6}`}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>Transações Recentes</div>
            <div className={styles.cardAction}>Ver extrato</div>
          </div>
           <div className="flex flex-col gap-1">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className={styles.listItem}>
                <div className={styles.listLeft}>
                  <div className={styles.itemIcon}>
                      <tx.icon size={18} />
                  </div>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemTitle}>{tx.desc}</span>
                    <span className={styles.itemSub}>{tx.category} • {tx.date}</span>
                  </div>
                </div>
                <div className={styles.itemValue} style={{color: tx.type === 'income' ? '#32d6a5' : 'white'}}>
                  {tx.type === 'income' ? '+' : ''}{formatCurrency(tx.amount)}
                </div>
              </div>
            ))}
           </div>
       </div>
      
      <CreateTransactionModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSuccess={() => refetch()}
      />
    </div>
  );
}
