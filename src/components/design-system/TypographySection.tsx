"use client";

import { SectionTitle } from "./SectionTitle";

const textSamples = [
  {
    label: "Display / Hero",
    className:
      "text-5xl font-bold tracking-tight [font-family:var(--font-poppins)]",
    sample: "Controle financeiro inteligente",
  },
  {
    label: "H1 — Page Title",
    className: "text-4xl font-bold tracking-tight",
    sample: "Visão Geral do Mês",
  },
  {
    label: "H2 — Section Title",
    className: "text-3xl font-semibold",
    sample: "Transações Recentes",
  },
  {
    label: "H3 — Card Title",
    className: "text-2xl font-semibold",
    sample: "Saldo em Conta",
  },
  {
    label: "H4 — Subsection",
    className: "text-xl font-semibold",
    sample: "Categorias de Gastos",
  },
  {
    label: "H5 — Label grande",
    className: "text-lg font-medium",
    sample: "Meta de Economia Mensal",
  },
  {
    label: "H6 — Label pequeno",
    className: "text-base font-medium",
    sample: "Limite do Cartão",
  },
  {
    label: "Body — Padrão",
    className: "text-base font-normal leading-relaxed",
    sample:
      "O Miu analisa seus padrões de gastos e oferece insights personalizados para ajudá-lo a economizar mais e alcançar seus objetivos financeiros.",
  },
  {
    label: "Body — Small",
    className: "text-sm font-normal leading-relaxed",
    sample:
      "Esta transação foi categorizada automaticamente pela IA com base no seu histórico de compras anteriores.",
  },
  {
    label: "Caption / Helper",
    className: "text-xs text-muted-foreground",
    sample: "Última atualização: 1 de março de 2026 às 09:41",
  },
  {
    label: "Overline / Tag",
    className: "text-xs font-semibold uppercase tracking-widest text-primary",
    sample: "Categorias Principais",
  },
  {
    label: "Mono / Código",
    className: "text-sm font-mono bg-muted px-2 py-0.5 rounded",
    sample: "GET /api/v1/transactions?month=2026-03",
  },
  {
    label: "Lead / Destaque",
    className: "text-lg text-muted-foreground font-light",
    sample: "Você economizou R$ 847,00 este mês. Continue assim!",
  },
];

const fontWeights = [
  { label: "Thin 100", className: "font-thin" },
  { label: "ExtraLight 200", className: "font-extralight" },
  { label: "Light 300", className: "font-light" },
  { label: "Normal 400", className: "font-normal" },
  { label: "Medium 500", className: "font-medium" },
  { label: "SemiBold 600", className: "font-semibold" },
  { label: "Bold 700", className: "font-bold" },
  { label: "ExtraBold 800", className: "font-extrabold" },
];

export function TypographySection() {
  return (
    <section>
      <SectionTitle
        icon="Type"
        title="Tipografia"
        description="Escala tipográfica completa — hierarquia de títulos, corpo de texto, captions e fontes especiais."
      />

      {/* Font families */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="rounded-xl border border-border p-5 bg-card">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
            Fonte principal — Poppins
          </p>
          <p className="text-2xl font-semibold [font-family:var(--font-poppins)]">
            Miu Controle Financeiro
          </p>
          <p className="text-sm text-muted-foreground mt-1 [font-family:var(--font-poppins)]">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            <br />
            abcdefghijklmnopqrstuvwxyz 0–9
          </p>
        </div>
        <div className="rounded-xl border border-border p-5 bg-card">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
            Fonte secundária — Inter
          </p>
          <p className="text-2xl font-semibold [font-family:var(--font-inter)]">
            Miu Controle Financeiro
          </p>
          <p className="text-sm text-muted-foreground mt-1 [font-family:var(--font-inter)]">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            <br />
            abcdefghijklmnopqrstuvwxyz 0–9
          </p>
        </div>
      </div>

      {/* Font weights */}
      <div className="rounded-xl border border-border p-5 bg-card mb-10">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
          Pesos disponíveis
        </p>
        <div className="flex flex-wrap gap-4">
          {fontWeights.map((w) => (
            <div key={w.label} className="flex flex-col items-center gap-1">
              <span className={`text-2xl ${w.className}`}>Aa</span>
              <span className="text-xs text-muted-foreground">{w.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scale */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="border-b border-border px-5 py-3 grid grid-cols-[160px_1fr] gap-4">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Estilo
          </span>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Exemplo
          </span>
        </div>
        {textSamples.map((t) => (
          <div
            key={t.label}
            className="px-5 py-4 grid grid-cols-[160px_1fr] gap-4 items-center border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
          >
            <span className="text-xs text-muted-foreground font-mono">
              {t.label}
            </span>
            <span className={t.className}>{t.sample}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
