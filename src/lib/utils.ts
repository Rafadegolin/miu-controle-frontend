import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, currency = "BRL", locale = "pt-BR"): string {
  // Fallback map for common currencies if locale isn't provided
  const localeMap: Record<string, string> = {
    USD: "en-US",
    EUR: "de-DE",
    JPY: "ja-JP",
    GBP: "en-GB",
  };

  const finalLocale = locale === "pt-BR" && currency !== "BRL" 
      ? (localeMap[currency] || "en-US") 
      : locale;

  return new Intl.NumberFormat(finalLocale, {
    style: "currency",
    currency: currency,
  }).format(value);
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

/**
 * Normaliza o status de orçamento para MAIÚSCULAS. GET /budgets usa
 * OK/WARNING/EXCEEDED, mas o bloco `budgets` de GET /dashboard/home usa
 * ok/warning/exceeded — este helper unifica os dois. (docs/handoff/budgets.md)
 */
export function normalizeBudgetStatus(
  status?: string | null,
): "OK" | "WARNING" | "EXCEEDED" {
  const s = (status ?? "").toUpperCase();
  if (s === "EXCEEDED") return "EXCEEDED";
  if (s === "WARNING") return "WARNING";
  return "OK";
}

export function getFullImageUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http") || url.startsWith("https") || url.startsWith("blob:")) return url;
  
  // Clean base URL (remove trailing slash)
  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
  
  // Clean path (remove leading slash)
  const cleanPath = url.startsWith("/") ? url.substring(1) : url;
  
  return `${baseUrl}/${cleanPath}`;
}
