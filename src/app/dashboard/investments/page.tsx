"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, BrainCircuit } from "lucide-react";
import { MOCK_INVESTMENTS, COLORS } from "@/lib/constants";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function InvestmentsPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#00404f]">Investimentos</h2>
        <Button variant="mint">
          <Plus size={16} /> Novo Aporte
        </Button>
      </div>

      <div className="bg-linear-to-r from-[#00404f] to-[#3c88a0] rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex gap-6 items-start">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
            <BrainCircuit size={32} className="text-[#7cddb1]" />
          </div>
          <div>
            <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
              Miu AI Insights{" "}
              <span className="text-[10px] bg-[#7cddb1] text-[#00404f] px-2 py-0.5 rounded-full font-bold">
                BETA
              </span>
            </h3>
            <p className="text-[#7cddb1]/80 max-w-2xl leading-relaxed">
              Identifiquei que você tem <strong>R$ 15.000</strong> parados na
              conta corrente. Se aplicar no Tesouro Selic hoje, você pode ganhar
              aproximadamente <strong>R$ 130,00</strong> a mais por mês sem
              risco.
            </p>
            <div className="flex gap-3 mt-6">
              <button className="bg-[#7cddb1] text-[#00404f] px-4 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors">
                Simular Agora
              </button>
              <button className="bg-white/10 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-white/20 transition-colors">
                Dispensar
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#7cddb1] opacity-10 blur-3xl rounded-full pointer-events-none"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_INVESTMENTS.map((inv) => (
          <Card key={inv.id}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs"
                  style={{ background: inv.color }}
                >
                  {inv.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-[#00404f] text-sm">
                    {inv.name}
                  </h4>
                  <p className="text-xs text-[#00404f]/50">{inv.type}</p>
                </div>
              </div>
              <span
                className={`text-sm font-bold ${
                  inv.return.includes("+") ? "text-[#007459]" : "text-[#ff6b6b]"
                }`}
              >
                {inv.return}
              </span>
            </div>
            <div className="flex justify-between items-end mt-4">
              <div>
                <p className="text-[10px] uppercase font-bold text-[#00404f]/40">
                  Saldo
                </p>
                <p className="text-lg font-bold text-[#00404f]">
                  R$ {inv.value.toLocaleString()}
                </p>
              </div>
              <div className="h-8 w-20">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { v: 10 },
                      { v: 12 },
                      { v: 11 },
                      { v: 14 },
                      { v: 13 },
                      { v: 15 },
                    ]}
                  >
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke={
                        inv.return.includes("+")
                          ? COLORS.success
                          : COLORS.expense
                      }
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
