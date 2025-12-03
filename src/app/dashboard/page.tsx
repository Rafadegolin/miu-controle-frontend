"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BalanceRing } from "@/components/dashboard/BalanceRing";
import { TransactionItem } from "@/components/dashboard/TransactionItem";
import {
  Calendar,
  Plus,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  MOCK_USER,
  MOCK_TRANSACTIONS,
  CATEGORY_DATA,
  REPORT_DATA,
} from "@/lib/constants";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { COLORS } from "@/lib/constants";

export default function DashboardPage() {
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
              <Calendar size={16} /> Dezembro
            </Button>
            <Button variant="primary" size="sm">
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
                <span className="text-[#7cddb1] bg-[#7cddb1]/10 px-2 py-0.5 rounded text-xs font-bold">
                  +12%
                </span>
              </div>
              <p className="text-[#3c88a0] text-sm">Saldo Total</p>
              <h3 className="text-2xl font-bold text-white">R$ 48.847,00</h3>
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-[#7cddb1]/20 text-[#007459] rounded-lg">
                <ArrowUpRight size={20} />
              </div>
            </div>
            <p className="text-[#00404f]/60 text-sm">Receitas</p>
            <h3 className="text-2xl font-bold text-[#00404f]">R$ 15.500</h3>
          </Card>

          <Card>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-[#ff6b6b]/20 text-[#ff6b6b] rounded-lg">
                <ArrowDownRight size={20} />
              </div>
            </div>
            <p className="text-[#00404f]/60 text-sm">Despesas</p>
            <h3 className="text-2xl font-bold text-[#00404f]">R$ 4.200</h3>
          </Card>
        </div>

        {/* Main Chart */}
        <Card className="min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#00404f]">Fluxo de Caixa</h3>
            <select className="text-xs bg-[#F8FAFC] border border-[#00404f]/10 rounded-lg px-2 py-1 text-[#00404f] outline-none">
              <option>Últimos 6 meses</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REPORT_DATA}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={COLORS.success}
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="95%"
                      stopColor={COLORS.success}
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={COLORS.expense}
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="95%"
                      stopColor={COLORS.expense}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderColor: "#E2E8F0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="receita"
                  stroke={COLORS.success}
                  strokeWidth={2}
                  fill="url(#colorIncome)"
                />
                <Area
                  type="monotone"
                  dataKey="despesa"
                  stroke={COLORS.expense}
                  strokeWidth={2}
                  fill="url(#colorExpense)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Sidebar Area (Widgets) */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <Card className="flex flex-col items-center py-8">
          <h3 className="text-[#00404f] font-bold mb-4">Orçamento Mensal</h3>
          <BalanceRing
            available={MOCK_USER.balance.available}
            budget={MOCK_USER.balance.budget}
            used={MOCK_USER.balance.used}
          />
          <div className="w-full mt-6 space-y-3 px-2">
            {CATEGORY_DATA.slice(0, 3).map((cat, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: cat.color }}
                  />
                  <span className="text-[#00404f]/70">{cat.name}</span>
                </div>
                <span className="font-semibold text-[#00404f]">
                  {cat.value}%
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[#00404f]">Últimas Transações</h3>
            <button className="text-[#3c88a0] text-xs hover:underline">
              Ver tudo
            </button>
          </div>
          <div className="space-y-3">
            {MOCK_TRANSACTIONS.slice(0, 4).map((tx) => (
              <TransactionItem key={tx.id} data={tx} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
