"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Search,
  Filter,
  Plus,
  Utensils,
  Car,
  ShoppingCart,
  Play,
  Banknote,
} from "lucide-react";
import { MOCK_TRANSACTIONS } from "@/lib/constants";
import React from "react";

const iconMap: Record<string, React.ReactElement> = {
  Alimentação: <Utensils size={18} />,
  Transporte: <Car size={18} />,
  Lazer: <Play size={18} />,
  Receita: <Banknote size={18} />,
};

export default function TransactionsPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#00404f]">Transações</h2>
        <div className="flex gap-2">
          <Button variant="secondary">
            <Filter size={16} /> Filtros
          </Button>
          <Button variant="primary">
            <Plus size={16} /> Nova
          </Button>
        </div>
      </div>

      <Card className="p-0! overflow-hidden">
        <div className="border-b border-[#00404f]/10 p-4 bg-[#F8FAFC] flex gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00404f]/40"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#00404f]/10 bg-white focus:border-[#3c88a0] outline-none text-sm"
            />
          </div>
          <select className="px-4 py-2 rounded-lg border border-[#00404f]/10 bg-white text-[#00404f] text-sm outline-none">
            <option>Todas as Categorias</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8FAFC] text-[#00404f]/60 font-semibold border-b border-[#00404f]/10">
              <tr>
                <th className="px-6 py-4">Descrição</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Método</th>
                <th className="px-6 py-4 text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#00404f]/5">
              {MOCK_TRANSACTIONS.map((tx) => {
                const icon = iconMap[tx.cat] || <ShoppingCart size={18} />;

                return (
                  <tr
                    key={tx.id}
                    className="hover:bg-[#F8FAFC]/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#00404f]/5 flex items-center justify-center text-[#00404f]">
                          {icon}
                        </div>
                        <span className="font-medium text-[#00404f]">
                          {tx.desc}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md bg-[#00404f]/5 text-[#00404f] text-xs font-medium">
                        {tx.cat}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#00404f]/60">{tx.date}</td>
                    <td className="px-6 py-4 text-[#00404f]/60">{tx.method}</td>
                    <td
                      className={`px-6 py-4 text-right font-bold ${
                        tx.type === "income"
                          ? "text-[#007459]"
                          : "text-[#00404f]"
                      }`}
                    >
                      {tx.amount < 0 ? "-" : "+"} R${" "}
                      {Math.abs(tx.amount).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
