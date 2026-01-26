import { TopTransactionsResponse } from "@/types/api";
import { formatCurrency } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface TopTransactionsProps {
  data: TopTransactionsResponse;
}

export function TopTransactions({ data }: TopTransactionsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Despesas */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="p-1 rounded bg-red-400/10 text-red-400">
            <ArrowDownRight size={16} />
          </span>
          Maiores Despesas
        </h3>
        <div className="space-y-3">
          {data.topExpenses.length > 0 ? (
            data.topExpenses.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center text-sm">
                <div className="flex flex-col">
                  <span className="text-white font-medium">{tx.description}</span>
                  <span className="text-xs text-gray-500">{tx.category?.name} • {new Date(tx.date).toLocaleDateString()}</span>
                </div>
                <span className="text-red-400 font-bold">
                  {formatCurrency(tx.amount)}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Nenhuma despesa no período.</p>
          )}
        </div>
      </div>

       {/* Top Receitas */}
       <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
           <span className="p-1 rounded bg-[#32d6a5]/10 text-[#32d6a5]">
            <ArrowUpRight size={16} />
          </span>
          Maiores Receitas
        </h3>
        <div className="space-y-3">
          {data.topIncomes.length > 0 ? (
            data.topIncomes.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center text-sm">
                <div className="flex flex-col">
                  <span className="text-white font-medium">{tx.description}</span>
                  <span className="text-xs text-gray-500">{tx.category?.name} • {new Date(tx.date).toLocaleDateString()}</span>
                </div>
                <span className="text-[#32d6a5] font-bold">
                  {formatCurrency(tx.amount)}
                </span>
              </div>
            ))
          ) : (
             <p className="text-gray-500 text-sm">Nenhuma receita no período.</p>
          )}
        </div>
      </div>
    </div>
  );
}
