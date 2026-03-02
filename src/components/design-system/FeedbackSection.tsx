"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { SectionTitle } from "./SectionTitle";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  Sparkles,
  Bell,
  X,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type AlertVariant = "info" | "success" | "warning" | "error";

// Note: dark: prefix doesn't work with data-theme — getAlertStyles handles this manually.
function getAlertStyles(
  isDark: boolean,
): Record<
  AlertVariant,
  {
    icon: React.ElementType;
    bg: string;
    border: string;
    text: string;
    iconColor: string;
  }
> {
  return {
    info: {
      icon: Info,
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      text: isDark ? "text-blue-300" : "text-blue-800",
      iconColor: isDark ? "text-blue-400" : "text-blue-600",
    },
    success: {
      icon: CheckCircle2,
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      text: isDark ? "text-green-300" : "text-green-800",
      iconColor: isDark ? "text-green-400" : "text-green-600",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      text: isDark ? "text-yellow-300" : "text-amber-800",
      iconColor: isDark ? "text-yellow-400" : "text-amber-600",
    },
    error: {
      icon: AlertCircle,
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      text: isDark ? "text-red-300" : "text-red-800",
      iconColor: isDark ? "text-red-400" : "text-red-700",
    },
  };
}

function InlineAlert({
  variant,
  title,
  description,
  dismissible = false,
}: {
  variant: AlertVariant;
  title: string;
  description?: string;
  dismissible?: boolean;
}) {
  const [visible, setVisible] = React.useState(true);
  const { theme } = useTheme();
  const isDark =
    (theme ?? "original-dark") === "original-dark" || theme === "simple-dark";
  const style = getAlertStyles(isDark)[variant];
  const Icon = style.icon;

  if (!visible) return null;

  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border p-4 relative",
        style.bg,
        style.border,
      )}
    >
      <Icon className={cn("size-5 shrink-0 mt-0.5", style.iconColor)} />
      <div className="flex-1 min-w-0">
        <p className={cn("font-medium text-sm", style.text)}>{title}</p>
        {description && (
          <p className={cn("text-sm mt-0.5 opacity-80", style.text)}>
            {description}
          </p>
        )}
      </div>
      {dismissible && (
        <button
          onClick={() => setVisible(false)}
          className={cn(
            "shrink-0 opacity-60 hover:opacity-100 transition-opacity",
            style.text,
          )}
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

const TOAST_ACTIONS = [
  {
    label: "Sucesso",
    color: "bg-green-500 hover:bg-green-600 text-white",
    action: () =>
      toast.success("Transação criada!", {
        description: "R$ 850,00 adicionados como receita.",
      }),
  },
  {
    label: "Erro",
    color: "bg-red-500 hover:bg-red-600 text-white",
    action: () =>
      toast.error("Falha ao salvar", {
        description: "Verifique sua conexão e tente novamente.",
      }),
  },
  {
    label: "Info",
    color: "bg-blue-500 hover:bg-blue-600 text-white",
    action: () =>
      toast.info("Sincronizando dados", {
        description: "Aguarde enquanto importamos suas transações.",
      }),
  },
  {
    label: "Atenção",
    color: "bg-yellow-500 hover:bg-yellow-600 text-white",
    action: () =>
      toast.warning("Orçamento quase no limite!", {
        description: "Você usou 92% do orçamento de Alimentação.",
      }),
  },
  {
    label: "Loading",
    color: "bg-muted border border-border text-foreground hover:bg-muted/80",
    action: () =>
      toast.loading("Processando transações...", { duration: 2500 }),
  },
  {
    label: "Com ação",
    color: "bg-primary/90 hover:bg-primary text-primary-foreground",
    action: () =>
      toast("Meta atingida! 🎉", {
        description: "Você alcançou sua meta de economia mensal.",
        action: { label: "Ver detalhes", onClick: () => {} },
      }),
  },
];

export function FeedbackSection() {
  return (
    <section>
      <SectionTitle
        icon="Layers"
        title="Feedback & Alertas"
        description="Componentes de feedback visual: alertas inline, toasts e notificações."
      />

      {/* Inline alerts */}
      <div className="rounded-xl border border-border bg-card p-5 mb-6">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          Alertas Inline
        </p>
        <div className="space-y-3">
          <InlineAlert
            variant="info"
            title="Dica de economia"
            description="Você gasta 28% a mais em alimentação do que a média dos seus últimos 3 meses."
          />
          <InlineAlert
            variant="success"
            title="Meta concluída!"
            description="Você atingiu sua meta de economia de R$ 1.000,00 neste mês."
            dismissible
          />
          <InlineAlert
            variant="warning"
            title="Orçamento quase esgotado"
            description='Você já usou 92% do limite de "Lazer". Restam apenas R$ 40,00.'
            dismissible
          />
          <InlineAlert
            variant="error"
            title="Falha na sincronização"
            description="Não foi possível importar as transações do Banco X. Tente novamente."
            dismissible
          />
        </div>
      </div>

      {/* Toast examples */}
      <div className="rounded-xl border border-border bg-card p-5 mb-6">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          Toasts (Sonner)
        </p>
        <div className="flex flex-wrap gap-2">
          {TOAST_ACTIONS.map((t) => (
            <button
              key={t.label}
              onClick={t.action}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                t.color,
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notification cards */}
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          Cards de Notificação
        </p>
        <div className="space-y-3">
          {[
            {
              icon: Sparkles,
              iconBg: "bg-primary/10",
              iconColor: "text-primary",
              title: "IA detectou oportunidade",
              desc: "Cancelando sua assinatura do app Y você pode economizar R$ 89,90/mês.",
              time: "Agora mesmo",
              unread: true,
            },
            {
              icon: AlertCircle,
              iconBg: "bg-red-500/10",
              iconColor: "text-red-500",
              title: "Limite de cartão próximo",
              desc: "Seu cartão Nubank está com 87% do limite utilizado.",
              time: "5 min atrás",
              unread: true,
            },
            {
              icon: CheckCircle2,
              iconBg: "bg-green-500/10",
              iconColor: "text-green-500",
              title: "Salário recebido",
              desc: "R$ 5.800,00 entrada detectada na conta Bradesco.",
              time: "1h atrás",
              unread: false,
            },
            {
              icon: Bell,
              iconBg: "bg-muted",
              iconColor: "text-muted-foreground",
              title: "Extrato mensal disponível",
              desc: "Seu extrato de fevereiro está pronto para download.",
              time: "Ontem",
              unread: false,
            },
          ].map((n, i) => {
            const Icon = n.icon;
            return (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer",
                  n.unread
                    ? "bg-muted/40 hover:bg-muted/60"
                    : "hover:bg-muted/20",
                )}
              >
                <div
                  className={cn(
                    "size-9 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                    n.iconBg,
                  )}
                >
                  <Icon className={cn("size-4", n.iconColor)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        n.unread ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {n.title}
                    </p>
                    {n.unread && (
                      <div className="size-2 rounded-full bg-primary shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {n.desc}
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    {n.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* States */}
      <div className="rounded-xl border border-border bg-card p-5 mt-6">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          Estados de Carregamento
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Carregando transações...
          </div>
          <Button disabled>
            <Loader2 className="size-4 animate-spin" />
            Salvando...
          </Button>
          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <span className="text-xs">Spinner circular</span>
          </div>
          <div className="text-center">
            <div className="flex gap-1 mb-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="size-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">Dots</span>
          </div>
        </div>
      </div>
    </section>
  );
}
