"use client";

import { useTheme } from "next-themes";
import { SectionTitle } from "./SectionTitle";

const BACKGROUND_GRADIENTS = [
  {
    theme: "Original Dark",
    themeId: "original-dark",
    description:
      "Dois radiais sobrepostos que criam profundidade oceânica sobre o fundo #020809.",
    gradient:
      "radial-gradient(circle at 10% 20%, #0c4a55 0%, transparent 40%), radial-gradient(circle at 90% 80%, #1f8566 0%, transparent 40%)",
    bg: "#020809",
    stops: [
      {
        label: "Radial 1 — centro",
        hex: "#0c4a55",
        pos: "10% 20%",
        size: "40%",
      },
      {
        label: "Radial 2 — centro",
        hex: "#1f8566",
        pos: "90% 80%",
        size: "40%",
      },
      { label: "Base", hex: "#020809", pos: "—", size: "—" },
    ],
  },
  {
    theme: "Original Light",
    themeId: "original-light",
    description:
      "Versão suave para o tema claro, mantendo a mesma estrutura de posicionamento.",
    gradient:
      "radial-gradient(circle at 10% 20%, #bfdbfe 0%, transparent 40%), radial-gradient(circle at 90% 80%, #bbf7d0 0%, transparent 40%)",
    bg: "#f9fafb",
    stops: [
      {
        label: "Radial 1 — centro",
        hex: "#bfdbfe",
        pos: "10% 20%",
        size: "40%",
      },
      {
        label: "Radial 2 — centro",
        hex: "#bbf7d0",
        pos: "90% 80%",
        size: "40%",
      },
      { label: "Base", hex: "#f9fafb", pos: "—", size: "—" },
    ],
  },
];

const COLOR_TOKENS = [
  {
    token: "--background",
    label: "background",
    description: "Fundo principal da página",
  },
  {
    token: "--foreground",
    label: "foreground",
    description: "Texto principal",
  },
  { token: "--card", label: "card", description: "Fundo dos cards" },
  {
    token: "--card-foreground",
    label: "card-foreground",
    description: "Texto dentro dos cards",
  },
  {
    token: "--popover",
    label: "popover",
    description: "Fundo de popovers/dropdowns",
  },
  {
    token: "--primary",
    label: "primary",
    description: "Cor de destaque principal",
  },
  {
    token: "--primary-foreground",
    label: "primary-foreground",
    description: "Texto sobre primary",
  },
  { token: "--secondary", label: "secondary", description: "Cor secundária" },
  {
    token: "--secondary-foreground",
    label: "secondary-foreground",
    description: "Texto sobre secondary",
  },
  { token: "--muted", label: "muted", description: "Superfícies sutis" },
  {
    token: "--muted-foreground",
    label: "muted-foreground",
    description: "Texto suave/placeholder",
  },
  { token: "--accent", label: "accent", description: "Cor de acentuação" },
  {
    token: "--accent-foreground",
    label: "accent-foreground",
    description: "Texto sobre accent",
  },
  {
    token: "--destructive",
    label: "destructive",
    description: "Erros e ações destrutivas",
  },
  { token: "--border", label: "border", description: "Bordas e divisores" },
  { token: "--input", label: "input", description: "Fundo de inputs" },
  { token: "--ring", label: "ring", description: "Anel de foco" },
];

const CHART_TOKENS = [
  { token: "--chart-1", label: "chart-1" },
  { token: "--chart-2", label: "chart-2" },
  { token: "--chart-3", label: "chart-3" },
  { token: "--chart-4", label: "chart-4" },
  { token: "--chart-5", label: "chart-5" },
];

const SIDEBAR_TOKENS = [
  { token: "--sidebar", label: "sidebar" },
  { token: "--sidebar-foreground", label: "sidebar-foreground" },
  { token: "--sidebar-primary", label: "sidebar-primary" },
  { token: "--sidebar-accent", label: "sidebar-accent" },
  { token: "--sidebar-border", label: "sidebar-border" },
];

function ColorSwatch({
  token,
  label,
  description,
}: {
  token: string;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
      <div
        className="w-10 h-10 rounded-lg border border-border/50 shrink-0 shadow-sm"
        style={{ background: `var(${token})` }}
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium font-mono">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        <p className="text-xs text-muted-foreground/70 font-mono mt-0.5">
          {token}
        </p>
      </div>
    </div>
  );
}

export function ColorPaletteSection() {
  const { theme } = useTheme();

  return (
    <section>
      <SectionTitle
        icon="Palette"
        title="Paleta de Cores"
        description="Todos os tokens de cor do sistema. Os valores mudam automaticamente conforme o tema selecionado."
      />

      {/* ── BACKGROUND GRADIENTS ─────────────────────────────── */}
      <div className="rounded-xl border border-border bg-card p-5 mb-8">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          Gradiente de fundo — background gradient
        </p>
        <p className="text-sm text-muted-foreground mb-5">
          Parte essencial da identidade visual do Miu. Dois{" "}
          <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
            radial-gradient
          </span>{" "}
          sobrepostos posicionados nos cantos opostos criam profundidade e
          direção visual sem poluir o conteúdo.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {BACKGROUND_GRADIENTS.map((g) => {
            const isActive = theme === g.themeId;
            return (
              <div
                key={g.themeId}
                className={`rounded-xl border overflow-hidden transition-all ${
                  isActive
                    ? "border-primary shadow-md shadow-primary/10"
                    : "border-border"
                }`}
              >
                {/* Preview */}
                <div
                  className="relative h-44 flex items-end"
                  style={{ background: g.bg }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: g.gradient }}
                  />
                  {/* Anotações dos pontos focais */}
                  <div
                    className="absolute size-16 rounded-full border-2 border-dashed border-white/30"
                    style={{
                      top: "calc(10% - 32px)",
                      left: "calc(10% - 32px)",
                    }}
                  />
                  <div
                    className="absolute size-16 rounded-full border-2 border-dashed border-white/30"
                    style={{
                      bottom: "calc(20% - 32px)",
                      right: "calc(10% - 32px)",
                    }}
                  />
                  <div className="relative z-10 p-4 flex items-center gap-2">
                    {isActive && (
                      <span className="text-xs bg-primary text-primary-foreground font-semibold px-2.5 py-1 rounded-full">
                        Tema ativo
                      </span>
                    )}
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(0,0,0,0.4)",
                        color: "#fff",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {g.theme}
                    </span>
                  </div>
                </div>

                {/* Detalhes */}
                <div className="bg-card p-4">
                  <p className="text-xs text-muted-foreground mb-3">
                    {g.description}
                  </p>

                  {/* Color stops */}
                  <div className="space-y-2 mb-4">
                    {g.stops.map((s) => (
                      <div key={s.label} className="flex items-center gap-3">
                        <div
                          className="size-6 rounded-md border border-border/50 shrink-0"
                          style={{ background: s.hex }}
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-muted-foreground">
                            {s.label}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-foreground">
                          {s.hex}
                        </span>
                        {s.pos !== "—" && (
                          <span className="font-mono text-xs text-muted-foreground hidden sm:inline">
                            @ {s.pos}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* CSS snippet */}
                  <div className="rounded-lg bg-muted/50 border border-border/50 p-3 overflow-x-auto">
                    <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap break-all leading-relaxed">
                      {`background:\n  ${g.gradient.replace("), ", "),\n  ")};`}
                    </pre>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── TOKEN COLORS ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core colors */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Tokens principais
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {COLOR_TOKENS.map((c) => (
                <ColorSwatch key={c.token} {...c} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Chart colors */}
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Cores de gráficos
            </p>
            <div className="space-y-1">
              {CHART_TOKENS.map((c) => (
                <ColorSwatch key={c.token} {...c} />
              ))}
            </div>
          </div>

          {/* Sidebar colors */}
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Cores da sidebar
            </p>
            <div className="space-y-1">
              {SIDEBAR_TOKENS.map((c) => (
                <ColorSwatch key={c.token} {...c} />
              ))}
            </div>
          </div>

          {/* Composition sample */}
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Composição
            </p>
            <div className="flex gap-2 flex-wrap">
              {COLOR_TOKENS.slice(0, 8).map((c) => (
                <div
                  key={c.token}
                  className="w-8 h-8 rounded-full border border-border/50"
                  style={{ background: `var(${c.token})` }}
                  title={c.label}
                />
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              {CHART_TOKENS.map((c) => (
                <div
                  key={c.token}
                  className="flex-1 h-3 rounded-full"
                  style={{ background: `var(${c.token})` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
