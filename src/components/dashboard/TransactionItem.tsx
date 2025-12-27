"use client";

import React from "react";
import { Transaction, TransactionType } from "@/types/api";
import { Utensils, Car, ShoppingCart, Play, Banknote } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

interface TransactionItemProps {
  data: Transaction;
}

const iconMap: Record<string, React.JSX.Element> = {
  Alimentação: <Utensils size={18} />,
  Transporte: <Car size={18} />,
  Lazer: <Play size={18} />,
  Receita: <Banknote size={18} />,
};

export function TransactionItem({ data }: TransactionItemProps) {
  const categoryName = data.category?.name || "Outros";
  const icon = iconMap[categoryName] || <ShoppingCart size={18} />;
  const isIncome = data.type === TransactionType.INCOME;

  return (
    <div className="flex items-center gap-3 p-2 hover:bg-[#F8FAFC] rounded-xl transition-colors cursor-pointer">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
          isIncome
            ? "bg-[#7cddb1]/20 text-[#007459]"
            : "bg-[#00404f]/5 text-[#00404f]"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#00404f] text-sm truncate">
          {data.description}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-[#00404f]/50">{categoryName}</p>
          <p className="text-xs text-[#00404f]/40">
            {new Date(data.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <span
        className={`text-sm font-bold ${
          isIncome ? "text-[#007459]" : "text-[#00404f]"
        }`}
      >
        {isIncome ? "+" : "-"} {formatCurrency(Number(data.amount))}
      </span>
    </div>
  );
}
