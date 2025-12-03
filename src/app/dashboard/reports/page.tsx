"use client";

import { Card } from "@/components/ui/Card";
import { CATEGORY_DATA, COLORS } from "@/lib/constants";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function ReportsPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-[#00404f]">
        Relatórios Avançados
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-[#00404f] mb-6">
            Gastos por Categoria
          </h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {CATEGORY_DATA.map((cat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-[#00404f]/70"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: cat.color }}
                />
                {cat.name} ({cat.value}%)
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-[#00404f] mb-6">Heatmap de Gastos</h3>
          <div className="grid grid-cols-7 gap-2">
            {["S", "T", "Q", "Q", "S", "S", "D"].map((d, i) => (
              <div
                key={i}
                className="text-center text-xs text-[#00404f]/40 font-bold"
              >
                {d}
              </div>
            ))}
            {Array.from({ length: 28 }).map((_, i) => {
              const intensity = Math.random();
              return (
                <div
                  key={i}
                  className="aspect-square rounded-md hover:scale-110 transition-transform cursor-pointer"
                  style={{
                    background:
                      intensity > 0.7
                        ? COLORS.expense
                        : intensity > 0.4
                        ? COLORS.warning
                        : COLORS.accent,
                    opacity: 0.3 + intensity * 0.7,
                  }}
                  title={`Gastos: ${Math.round(intensity * 100)}%`}
                />
              );
            })}
          </div>
          <div className="mt-6 p-4 bg-[#F8FAFC] rounded-xl border border-[#00404f]/5 text-sm text-[#00404f]/70">
            💡 Você gasta 40% a mais nas <strong>Sextas-feiras</strong>.
          </div>
        </Card>
      </div>
    </div>
  );
}
