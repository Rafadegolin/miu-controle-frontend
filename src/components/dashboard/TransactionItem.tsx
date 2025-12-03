"use client";

import { Transaction } from "@/types";
import { Utensils, Car, ShoppingCart, Play, Banknote } from "lucide-react";

interface TransactionItemProps {
  data: Transaction;
}

const iconMap: Record<string, JSX.Element> = {
  Alimentação: <Utensils size={18} />,
  Transporte: <Car size={18} />,
  Lazer: <Play size={18} />,
  Receita: <Banknote size={18} />,
};

export function TransactionItem({ data }: TransactionItemProps) {
  const icon = iconMap[data.cat] || <ShoppingCart size={18} />;

  return (
    <div className="flex items-center gap-3 p-2 hover:bg-[#F8FAFC] rounded-xl transition-colors cursor-pointer">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
          data.type === "income"
            ? "bg-[#7cddb1]/20 text-[#007459]"
            : "bg-[#00404f]/5 text-[#00404f]"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#00404f] text-sm truncate">
          {data.desc}
        </p>
        <p className="text-xs text-[#00404f]/50">{data.cat}</p>
      </div>
      <span
        className={`text-sm font-bold ${
          data.type === "income" ? "text-[#007459]" : "text-[#00404f]"
        }`}
      >
        {data.amount < 0 ? "-" : "+"} R$ {Math.abs(data.amount)}
      </span>
    </div>
  );
}
