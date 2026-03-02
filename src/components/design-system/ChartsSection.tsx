"use client";

import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { SectionTitle } from "./SectionTitle";

const monthlyData = [
  { month: "Set", income: 5200, expenses: 3800, balance: 1400 },
  { month: "Out", income: 5400, expenses: 4100, balance: 1300 },
  { month: "Nov", income: 4900, expenses: 3600, balance: 1300 },
  { month: "Dez", income: 6200, expenses: 5100, balance: 1100 },
  { month: "Jan", income: 5100, expenses: 3900, balance: 1200 },
  { month: "Fev", income: 5500, expenses: 4200, balance: 1300 },
  { month: "Mar", income: 5800, expenses: 3700, balance: 2100 },
];

const categoryData = [
  { name: "Alimentação", value: 1200, color: "var(--chart-1)" },
  { name: "Transporte", value: 650, color: "var(--chart-2)" },
  { name: "Moradia", value: 1800, color: "var(--chart-3)" },
  { name: "Saúde", value: 320, color: "var(--chart-4)" },
  { name: "Lazer", value: 480, color: "var(--chart-5)" },
];

const radarData = [
  { subject: "Economia", value: 82 },
  { subject: "Investimento", value: 60 },
  { subject: "Controle", value: 90 },
  { subject: "Planejamento", value: 70 },
  { subject: "Emergência", value: 45 },
  { subject: "Metas", value: 68 },
];

const radialData = [
  { name: "Alimentação", value: 1200, fill: "var(--chart-1)" },
  { name: "Moradia", value: 1800, fill: "var(--chart-2)" },
  { name: "Transporte", value: 650, fill: "var(--chart-3)" },
  { name: "Saúde", value: 320, fill: "var(--chart-4)" },
];

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: any) => {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function ChartCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <p className="font-semibold text-sm">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

function tooltipStyle() {
  return {
    contentStyle: {
      backgroundColor: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "8px",
      color: "var(--foreground)",
      fontSize: "12px",
    },
    labelStyle: { color: "var(--muted-foreground)" },
  };
}

export function ChartsSection() {
  return (
    <section>
      <SectionTitle
        icon="BarChart2"
        title="Gráficos"
        description="Todos os tipos de gráficos utilizados na aplicação via Recharts."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Chart */}
        <ChartCard
          title="Área — Receitas vs Despesas"
          description="Evolução mensal do fluxo financeiro"
        >
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chart-2)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-2)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chart-5)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-5)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="month"
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                {...tooltipStyle()}
                formatter={(v: number) => [
                  `R$ ${v.toLocaleString("pt-BR")}`,
                  "",
                ]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="income"
                name="Receitas"
                stroke="var(--chart-2)"
                fill="url(#incomeGrad)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                name="Despesas"
                stroke="var(--chart-5)"
                fill="url(#expenseGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Bar Chart */}
        <ChartCard
          title="Barras — Comparativo Mensal"
          description="Receitas, despesas e saldo por mês"
        >
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="month"
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                {...tooltipStyle()}
                formatter={(v: number) => [
                  `R$ ${v.toLocaleString("pt-BR")}`,
                  "",
                ]}
              />
              <Legend />
              <Bar
                dataKey="income"
                name="Receitas"
                fill="var(--chart-2)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="expenses"
                name="Despesas"
                fill="var(--chart-5)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="balance"
                name="Saldo"
                fill="var(--chart-1)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Line Chart */}
        <ChartCard
          title="Linhas — Evolução do Saldo"
          description="Tendência do saldo ao longo dos meses"
        >
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="month"
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `R$${v}`}
              />
              <Tooltip
                {...tooltipStyle()}
                formatter={(v: number) => [
                  `R$ ${v.toLocaleString("pt-BR")}`,
                  "Saldo",
                ]}
              />
              <Line
                type="monotone"
                dataKey="balance"
                name="Saldo"
                stroke="var(--primary)"
                strokeWidth={2.5}
                dot={{ fill: "var(--primary)", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Pie Chart */}
        <ChartCard
          title="Pizza — Gastos por Categoria"
          description="Distribuição percentual das despesas"
        >
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="40%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {categoryData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  {...tooltipStyle()}
                  formatter={(v: number) => [
                    `R$ ${v.toLocaleString("pt-BR")}`,
                    "",
                  ]}
                />
                <Legend
                  iconType="circle"
                  formatter={(value) => (
                    <span style={{ color: "var(--foreground)", fontSize: 11 }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Radar Chart */}
        <ChartCard
          title="Radar — Score de Saúde Financeira"
          description="Análise multidimensional do perfil financeiro"
        >
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              />
              <Radar
                dataKey="value"
                stroke="var(--primary)"
                fill="var(--primary)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Tooltip {...tooltipStyle()} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Radial Bar */}
        <ChartCard
          title="Barras Radiais — Orçamento por Categoria"
          description="Consumo do limite definido por categoria"
        >
          <ResponsiveContainer width="100%" height={220}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={100}
              barSize={14}
              data={radialData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                dataKey="value"
                label={{
                  position: "insideStart",
                  fill: "var(--foreground)",
                  fontSize: 10,
                }}
                cornerRadius={6}
              />
              <Tooltip
                {...tooltipStyle()}
                formatter={(v: number) => [
                  `R$ ${v.toLocaleString("pt-BR")}`,
                  "",
                ]}
              />
              <Legend
                iconType="circle"
                formatter={(value) => (
                  <span style={{ color: "var(--foreground)", fontSize: 11 }}>
                    {value}
                  </span>
                )}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </section>
  );
}
