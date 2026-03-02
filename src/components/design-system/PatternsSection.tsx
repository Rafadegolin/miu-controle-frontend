"use client";

import React from "react";
import { useTheme } from "next-themes";
import { SectionTitle } from "./SectionTitle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Coffee,
  ShoppingBag,
  Car,
  Home,
  Utensils,
  CreditCard,
  Banknote,
  LayoutDashboard,
  PieChart,
  Target,
  TrendingUp,
  Sparkles,
  Flame,
  X,
  AlertTriangle,
  AlertCircle,
  LogOut,
  HeartPulse,
  Repeat,
} from "lucide-react";

// ─── Theme gradient map (mirrors DesignSystemShell) ──────
const THEME_GRADIENTS: Record<string, string> = {
  "original-dark":
    "radial-gradient(circle at 10% 20%, #0c4a55 0%, transparent 40%), radial-gradient(circle at 90% 80%, #1f8566 0%, transparent 40%)",
  "original-light":
    "radial-gradient(circle at 10% 20%, #bfdbfe 0%, transparent 40%), radial-gradient(circle at 90% 80%, #bbf7d0 0%, transparent 40%)",
  "simple-dark": "none",
  "simple-light": "none",
};

// ─── Layout helpers ───────────────────────────────────────

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-semibold mb-4 mt-10 flex items-center gap-2 after:flex-1 after:h-px after:bg-border after:ml-2">
      {children}
    </h3>
  );
}

/**
 * Wrapper que replica o fundo da página (bg-background + gradiente do tema)
 * para exibir componentes "in-situ" — exatamente como aparecem no dashboard.
 */
function GradientPanel({
  gradient,
  children,
  label,
}: {
  gradient: string;
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <div
      className="rounded-xl relative overflow-hidden p-5"
      style={{ background: "var(--background)" }}
    >
      {gradient !== "none" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: gradient }}
        />
      )}
      <div className="relative z-10">
        {label && (
          <p
            className="text-xs font-mono mb-4"
            style={{
              color: "color-mix(in srgb, var(--foreground) 30%, transparent)",
            }}
          >
            ↳ {label}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

function SpecBox({
  children,
  label,
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {label && (
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          {label}
        </p>
      )}
      {children}
    </div>
  );
}

// ─── Stat Cards ──────────────────────────────────────────

const statCardsData = [
  {
    icon: Wallet,
    label: "Saldo Total",
    value: "R$ 12.450,00",
    extra: { delta: "+12%" },
    accent: "primary",
  },
  {
    icon: ArrowUpRight,
    label: "Receitas",
    value: "R$ 5.800,00",
    extra: { tag: "Este mês" },
    accent: "income",
  },
  {
    icon: ArrowDownRight,
    label: "Despesas",
    value: "R$ 3.420,00",
    extra: { tag: "Este mês" },
    accent: "expense",
  },
] as const;

function StatCard({
  item,
  isDark,
}: {
  item: (typeof statCardsData)[number];
  isDark: boolean;
}) {
  const isExpense = item.accent === "expense";
  const cardStyle = isDark
    ? {
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
      }
    : {
        background: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
      };
  const iconBg = isExpense
    ? "rgba(239,68,68,0.15)"
    : "color-mix(in srgb, var(--primary) 15%, transparent)";
  const iconColor = isExpense ? "#ef4444" : "var(--primary)";
  const valueColor = isExpense
    ? "#ef4444"
    : item.accent === "income"
      ? "var(--primary)"
      : "var(--foreground)";

  return (
    <div
      className="rounded-[20px] p-6 transition-all duration-300"
      style={cardStyle}
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className="size-9 rounded-lg flex items-center justify-center"
          style={{ background: iconBg }}
        >
          <item.icon className="size-4" style={{ color: iconColor }} />
        </div>
        {"tag" in item.extra ? (
          <span className="text-xs text-muted-foreground">
            {item.extra.tag}
          </span>
        ) : (
          <button className="text-muted-foreground">
            <MoreHorizontal className="size-4" />
          </button>
        )}
      </div>
      <p className="text-sm mb-1 text-muted-foreground">{item.label}</p>
      <div className="flex items-end gap-2">
        <p className="text-2xl font-bold" style={{ color: valueColor }}>
          {item.value}
        </p>
        {"delta" in item.extra && (
          <span
            className="text-xs font-semibold mb-0.5"
            style={{ color: "var(--primary)" }}
          >
            {item.extra.delta}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Transaction Items ────────────────────────────────────

const transactions = [
  {
    icon: Utensils,
    label: "Mercado Extra",
    sub: "Alimentação",
    amount: -358.7,
    date: "Hoje",
  },
  {
    icon: Banknote,
    label: "Salário Mensal",
    sub: "Renda",
    amount: 5800,
    date: "01/03",
  },
  {
    icon: Car,
    label: "Uber Viagem",
    sub: "Transporte",
    amount: -24.5,
    date: "28/02",
  },
  {
    icon: CreditCard,
    label: "Netflix Assinatura",
    sub: "Entretenimento",
    amount: -55.9,
    date: "27/02",
  },
];

function TransactionRow({
  item,
  isDark,
}: {
  item: (typeof transactions)[number];
  isDark: boolean;
}) {
  const isIncome = item.amount > 0;
  const iconBg = isIncome
    ? "color-mix(in srgb, var(--primary) 15%, transparent)"
    : isDark
      ? "rgba(255,255,255,0.04)"
      : "var(--muted)";
  const iconColor = isIncome ? "var(--primary)" : "var(--muted-foreground)";

  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/40 transition-colors cursor-pointer">
      <div
        className="size-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: iconBg }}
      >
        <item.icon className="size-4" style={{ color: iconColor }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate text-foreground">
          {item.label}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">{item.sub}</p>
          <p className="text-xs text-muted-foreground">{item.date}</p>
        </div>
      </div>
      <span
        className="text-sm font-bold shrink-0 ml-2"
        style={{ color: isIncome ? "var(--primary)" : "var(--foreground)" }}
      >
        {isIncome ? "+" : "-"} R${" "}
        {Math.abs(item.amount).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}
      </span>
    </div>
  );
}

// ─── Category Badges ──────────────────────────────────────

const categories = [
  {
    icon: Coffee,
    color: "#fca5a5",
    bg: "rgba(252,165,165,0.15)",
    label: "Alimentação",
    amount: "R$ 1.250",
  },
  {
    icon: ShoppingBag,
    color: "#86efac",
    bg: "rgba(134,239,172,0.15)",
    label: "Compras",
    amount: "R$  850",
  },
  {
    icon: Car,
    color: "#93c5fd",
    bg: "rgba(147,197,253,0.15)",
    label: "Transporte",
    amount: "R$  450",
  },
  {
    icon: Home,
    color: "#fdba74",
    bg: "rgba(253,186,116,0.15)",
    label: "Moradia",
    amount: "R$ 2.200",
  },
  {
    icon: HeartPulse,
    color: "#f9a8d4",
    bg: "rgba(249,168,212,0.15)",
    label: "Saúde",
    amount: "R$  320",
  },
  {
    icon: Sparkles,
    color: "#c4b5fd",
    bg: "rgba(196,181,253,0.15)",
    label: "Educação",
    amount: "R$  200",
  },
];

// ─── Sidebar nav data ─────────────────────────────────────

const navGroups = [
  {
    section: "PRINCIPAL",
    items: [
      { icon: LayoutDashboard, label: "Visão Geral", active: true },
      { icon: Wallet, label: "Transações", active: false },
      { icon: PieChart, label: "Relatórios", active: false },
      { icon: Target, label: "Metas", active: false },
      { icon: TrendingUp, label: "Projeções", active: false },
    ],
  },
  {
    section: "PLANEJAMENTO",
    items: [
      { icon: Sparkles, label: "Recomendações", active: false },
      { icon: Repeat, label: "Assinaturas", active: false },
    ],
  },
];

// ─── SVG Ring ─────────────────────────────────────────────

function CircularRing({ pct, size = 100 }: { pct: number; size?: number }) {
  const r = size * 0.38;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const cx = size / 2;
  const cy = size / 2;
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: 0,
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--primary) 10%, transparent) 0%, transparent 70%)",
        }}
      />
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke="color-mix(in srgb, var(--primary) 20%, transparent)"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke="var(--primary)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.5s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
          Usado
        </span>
        <span className="text-lg font-bold text-foreground">{pct}%</span>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────

export function PatternsSection() {
  const { theme } = useTheme();
  const currentTheme = theme ?? "original-dark";
  const gradient = THEME_GRADIENTS[currentTheme] ?? "none";
  const isDark =
    currentTheme === "original-dark" || currentTheme === "simple-dark";

  // Sidebar uses its own CSS var family
  const sidebarFg = "var(--sidebar-foreground)";
  const sidebarBdr = "var(--sidebar-border)";
  const sidebarPrimary = "var(--sidebar-primary)";
  const sidebarMuted =
    "color-mix(in srgb, var(--sidebar-foreground) 38%, transparent)";

  // Code/spec panel surface
  const specCode = isDark
    ? {
        background: "rgba(0,0,0,0.35)",
        border: "1px solid rgba(255,255,255,0.06)",
      }
    : { background: "var(--muted)", border: "1px solid var(--border)" };

  return (
    <section>
      <SectionTitle
        icon="LayoutGrid"
        title="Padrões da UI"
        description="Componentes compostos e padrões visuais recorrentes — stat cards, transações, nav, gamification e mais. Todos adaptados ao tema ativo."
      />

      {/* ── STAT CARDS ── */}
      <SubTitle>Stat Cards — Dashboard Summary</SubTitle>
      <GradientPanel
        gradient={gradient}
        label="exibido sobre o gradiente de fundo do tema"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statCardsData.map((c) => (
            <StatCard key={c.label} item={c} isDark={isDark} />
          ))}
        </div>
      </GradientPanel>

      {/* ── TRANSACTION ITEMS ── */}
      <SubTitle>Transaction Items</SubTitle>
      <SpecBox label="var(--card) · var(--foreground) · var(--primary) — adapta ao tema">
        <div className="space-y-1">
          {transactions.map((t) => (
            <TransactionRow key={t.label} item={t} isDark={isDark} />
          ))}
        </div>
      </SpecBox>

      {/* ── CATEGORY BADGES ── */}
      <SubTitle>Category Icon Badges</SubTitle>
      <SpecBox label="Cores semânticas por categoria — constantes em todos os temas">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.label}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted/40 transition-colors cursor-pointer"
              >
                <div
                  className="size-11 rounded-xl flex items-center justify-center"
                  style={{ background: c.bg }}
                >
                  <Icon className="size-5" style={{ color: c.color }} />
                </div>
                <span className="text-xs font-medium text-center text-foreground">
                  {c.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {c.amount}
                </span>
              </div>
            );
          })}
        </div>
      </SpecBox>

      {/* ── CIRCULAR RING ── */}
      <SubTitle>Circular Ring Progress</SubTitle>
      <SpecBox label="SVG ring — stroke: var(--primary) — adapta ao tema">
        <div className="flex flex-wrap gap-8 items-end">
          {[30, 68, 87, 100].map((v) => (
            <div key={v} className="flex flex-col items-center gap-2">
              <CircularRing pct={v} size={88} />
              <span className="text-xs text-muted-foreground">{v}%</span>
            </div>
          ))}
          <CircularRing pct={68} size={128} />
        </div>
        <p className="text-xs text-muted-foreground mt-4 font-mono">
          stroke: var(--primary) · strokeWidth: 8 · strokeLinecap: round · glow
          via radial-gradient
        </p>
      </SpecBox>

      {/* ── SIDEBAR NAV ── */}
      <SubTitle>Sidebar Navigation</SubTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sidebar mockup — usa var(--sidebar-*) */}
        <div
          className="rounded-xl overflow-hidden"
          style={{
            background: "var(--sidebar)",
            border: `1px solid ${sidebarBdr}`,
          }}
        >
          {/* Logo header */}
          <div
            className="flex items-center gap-2 px-5 py-4 font-bold"
            style={{
              color: sidebarFg,
              borderBottom: `1px solid ${sidebarBdr}`,
            }}
          >
            <span style={{ color: sidebarPrimary }}>✦</span> Miu Controle
          </div>

          {/* Nav groups */}
          <div className="p-3">
            {navGroups.map((g) => (
              <div key={g.section}>
                <p
                  className="text-xs font-semibold px-3 py-1.5 mb-1"
                  style={{ color: sidebarMuted, letterSpacing: "0.1em" }}
                >
                  {g.section}
                </p>
                {g.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer mb-0.5 transition-all"
                      style={{
                        background: item.active
                          ? "color-mix(in srgb, var(--sidebar-primary) 10%, transparent)"
                          : "transparent",
                        color: item.active
                          ? sidebarPrimary
                          : `color-mix(in srgb, ${sidebarFg} 65%, transparent)`,
                        borderLeft: item.active
                          ? `3px solid ${sidebarPrimary}`
                          : "3px solid transparent",
                      }}
                    >
                      <Icon className="size-4 shrink-0" />
                      {item.label}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* User footer */}
          <div
            className="p-3 mt-1"
            style={{ borderTop: `1px solid ${sidebarBdr}` }}
          >
            <div
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{
                background:
                  "color-mix(in srgb, var(--sidebar-foreground) 4%, transparent)",
                border: `1px solid ${sidebarBdr}`,
              }}
            >
              <Avatar className="size-8">
                <AvatarFallback
                  className="text-xs font-bold"
                  style={{
                    background:
                      "color-mix(in srgb, var(--sidebar-primary) 20%, transparent)",
                    color: sidebarPrimary,
                  }}
                >
                  R
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-bold truncate"
                  style={{ color: sidebarFg }}
                >
                  Rafael Souza
                </p>
                <p className="text-xs" style={{ color: sidebarMuted }}>
                  Pro Member
                </p>
              </div>
              <button className="p-1.5 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors">
                <LogOut className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* States card */}
        <div className="space-y-4">
          <SpecBox label="Nav Item — Estados">
            <div className="space-y-2">
              {[
                { label: "Ativo", active: true },
                { label: "Inativo", active: false },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm"
                  style={{
                    background: s.active
                      ? "color-mix(in srgb, var(--primary) 10%, transparent)"
                      : "transparent",
                    color: s.active
                      ? "var(--primary)"
                      : "var(--muted-foreground)",
                    borderLeft: s.active
                      ? "3px solid var(--primary)"
                      : "3px solid transparent",
                  }}
                >
                  <LayoutDashboard className="size-4" />
                  Visão Geral
                  <span className="ml-auto text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </SpecBox>
          <SpecBox label="Logotipo signature">
            <p className="text-lg font-bold text-foreground">
              <span style={{ color: "var(--primary)" }}>✦</span> Miu Controle
            </p>
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              ✦ cor: var(--primary) · texto: var(--foreground) · font: Inter
              bold
            </p>
          </SpecBox>
        </div>
      </div>

      {/* ── GAMIFICATION WIDGETS ── */}
      <SubTitle>Gamification Widgets</SubTitle>
      <GradientPanel
        gradient={gradient}
        label="widgets do header — brand colors independentes de tema"
      >
        <div className="flex flex-wrap gap-6 items-start">
          {/* StreakWidget */}
          <div>
            <p className="text-xs mb-2 text-muted-foreground">StreakWidget</p>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(249,115,22,0.1)",
                border: "1px solid rgba(249,115,22,0.2)",
              }}
            >
              <Flame className="size-4 text-orange-500 fill-orange-500" />
              <span className="text-sm font-bold font-mono text-orange-400">
                7
              </span>
            </div>
          </div>

          {/* LevelWidget */}
          <div>
            <p className="text-xs mb-2 text-muted-foreground">LevelWidget</p>
            <div
              className="flex items-center gap-3 rounded-full pl-1 pr-4 py-1"
              style={
                isDark
                  ? {
                      background: "rgba(6,24,27,0.8)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }
                  : {
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    }
              }
            >
              <div
                className="size-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background:
                    "linear-gradient(to bottom right, #32d6a5, #1f8566)",
                  color: "#020809",
                  boxShadow: "0 0 16px rgba(50,214,165,0.2)",
                }}
              >
                5
              </div>
              <div className="flex flex-col w-24">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <span>Level 5</span>
                  <span style={{ color: "#32d6a5" }}>68%</span>
                </div>
                <div className="h-1.5 w-full rounded-full overflow-hidden mt-0.5 bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "68%",
                      background: "linear-gradient(to right, #32d6a5, #2bc293)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Level badges */}
          <div>
            <p className="text-xs mb-2 text-muted-foreground">
              Level Badge (gradiente fixo de marca)
            </p>
            <div className="flex gap-2 flex-wrap">
              {[1, 5, 10, 25, 50].map((lvl) => (
                <div
                  key={lvl}
                  className="size-9 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #32d6a5, #1f8566)",
                    color: "#020809",
                    boxShadow: "0 0 12px rgba(50,214,165,0.2)",
                  }}
                >
                  {lvl}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-5 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
          style={specCode}
        >
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
              Level Badge
            </p>
            <pre className="text-xs font-mono text-muted-foreground leading-relaxed whitespace-pre-wrap">{`background: linear-gradient(\n  to bottom right,\n  #32d6a5, #1f8566\n);\nbox-shadow: 0 0 16px\n  rgba(50,214,165,0.2);`}</pre>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
              XP Progress Bar
            </p>
            <pre className="text-xs font-mono text-muted-foreground leading-relaxed whitespace-pre-wrap">{`background: linear-gradient(\n  to right,\n  #32d6a5, #2bc293\n);\ntrack: var(--muted);\nheight: 6px;`}</pre>
          </div>
        </div>
      </GradientPanel>

      {/* ── PROACTIVE ALERTS ── */}
      <SubTitle>Proactive Alert Items</SubTitle>
      <GradientPanel
        gradient={gradient}
        label="alertas proativos — escalas de cor adaptadas ao tema"
      >
        <div className="space-y-3">
          {[
            {
              icon: AlertTriangle,
              title: "Conta Próxima do Vencimento",
              message: "Atenção: Netflix Premium vence amanhã (R$ 55,90).",
              alertBg: isDark ? "rgba(234,179,8,0.10)" : "rgba(234,179,8,0.12)",
              alertBorder: isDark
                ? "rgba(234,179,8,0.20)"
                : "rgba(180,83,9,0.30)",
              iconBg: isDark ? "rgba(234,179,8,0.15)" : "rgba(234,179,8,0.20)",
              textColor: isDark ? "#facc15" : "#92400e",
              iconColor: isDark ? "#facc15" : "#b45309",
            },
            {
              icon: AlertCircle,
              title: "Risco de Saldo Negativo",
              message:
                "Projeção indica saldo negativo em 5 dias. Ação necessária.",
              alertBg: isDark ? "rgba(239,68,68,0.10)" : "rgba(239,68,68,0.10)",
              alertBorder: isDark
                ? "rgba(239,68,68,0.20)"
                : "rgba(185,28,28,0.30)",
              iconBg: isDark ? "rgba(239,68,68,0.15)" : "rgba(239,68,68,0.15)",
              textColor: isDark ? "#f87171" : "#991b1b",
              iconColor: isDark ? "#f87171" : "#b91c1c",
            },
          ].map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.title}
                className="flex items-start gap-4 p-4 rounded-xl relative"
                style={{
                  background: a.alertBg,
                  border: `1px solid ${a.alertBorder}`,
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  className="p-2 rounded-full shrink-0"
                  style={{ background: a.iconBg }}
                >
                  <Icon className="size-5" style={{ color: a.iconColor }} />
                </div>
                <div className="flex-1 pt-0.5 pr-6">
                  <p
                    className="font-bold text-sm"
                    style={{ color: a.textColor }}
                  >
                    {a.title}
                  </p>
                  <p className="text-sm mt-1 leading-relaxed text-muted-foreground">
                    {a.message}
                  </p>
                </div>
                <span className="absolute top-3 right-10 text-xs text-muted-foreground">
                  22:52
                </span>
                <button className="absolute top-3 right-3 p-1 rounded-lg text-muted-foreground hover:bg-muted/40 transition-colors">
                  <X className="size-4" />
                </button>
              </div>
            );
          })}

          <div className="rounded-xl p-4" style={specCode}>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
              Spec
            </p>
            <p className="text-xs font-mono text-muted-foreground leading-relaxed">
              backdrop-filter: blur(12px) · border-radius: 12px
              <br />
              warning → bg rgba(234,179,8,0.1) · border rgba(234,179,8,0.2)
              <br />
              critical → bg rgba(239,68,68,0.1) · border rgba(239,68,68,0.2)
            </p>
          </div>
        </div>
      </GradientPanel>
    </section>
  );
}
