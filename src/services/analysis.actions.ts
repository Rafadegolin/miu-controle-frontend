import { reportsActions } from "./reports.actions";
import { MonthlyReport, AnalysisInsight } from "@/types/api";

// Converte "YYYY-MM" no range de datas do mês (para os endpoints de /reports).
function monthToRange(month: string): { startDate: string; endDate: string } {
  const [y, m] = month.split("-").map(Number);
  const lastDay = new Date(y, m, 0).getDate();
  return {
    startDate: `${month}-01`,
    endDate: `${month}-${String(lastDay).padStart(2, "0")}`,
  };
}

const TYPE_MAP: Record<string, AnalysisInsight["type"]> = {
  positive: "POSITIVE",
  negative: "NEGATIVE",
  warning: "WARNING",
  info: "NEUTRAL",
};

/**
 * Reconcilia o antigo "MonthlyReport" (mock) com dados reais: os insights vêm de
 * GET /reports/insights. A página de relatórios só consome `insights`/`anomalies`
 * daqui (os KPIs vêm do dashboard real), então stats/comparison ficam zerados.
 */
export async function getMonthlyReport(
  month: string = new Date().toISOString().slice(0, 7),
): Promise<MonthlyReport> {
  const range = monthToRange(month);
  const insights = await reportsActions.getInsights(range);

  return {
    month,
    stats: { income: 0, expense: 0, balance: 0, savingsRate: 0 },
    comparison: { incomeChange: 0, expenseChange: 0, savingsRateChange: 0 },
    insights: insights.map((ins, i) => ({
      id: String(i),
      type: TYPE_MAP[ins.type] ?? "NEUTRAL",
      relatedMetric: "BALANCE",
      message: ins.title,
      explanation: ins.message,
    })),
    anomalies: [],
    topCategories: [],
  };
}
