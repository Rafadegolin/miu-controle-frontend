"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Plus, TrendingUp, Wallet } from "lucide-react";
import { useAccounts } from "@/hooks/useAccounts";
import { AccountType, Account } from "@/types/api";
import { formatCurrency } from "@/lib/utils";

export default function InvestmentsPage() {
  const { accounts, isLoadingAccounts } = useAccounts();

  const investmentAccounts: Account[] = (accounts || []).filter(
    (a: Account) => a.type === AccountType.INVESTMENT
  );

  const total = investmentAccounts.reduce(
    (sum, a) => sum + Number(a.currentBalance ?? 0),
    0
  );

  return (
    <div className="space-y-6 animate-fade-in-up pb-20">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Investimentos</h2>
          <p className="text-gray-400 text-sm">
            Suas contas de investimento e saldo aplicado.
          </p>
        </div>
        <Link href="/dashboard/accounts">
          <Button className="bg-[#32d6a5] hover:bg-[#2bc293] text-[#020809] font-bold rounded-lg">
            <Plus size={18} className="mr-2" /> Nova conta
          </Button>
        </Link>
      </div>

      {/* TOTAL */}
      <div className="bg-linear-to-r from-[#0e4b51] to-[#2c6e75] rounded-2xl p-6 border border-white/5">
        <p className="text-gray-300 text-xs font-bold uppercase tracking-wider mb-1">
          Total investido
        </p>
        <p className="text-[#32d6a5] font-bold text-3xl">
          {formatCurrency(total)}
        </p>
        <p className="text-gray-400 text-xs mt-2">
          {investmentAccounts.length}{" "}
          {investmentAccounts.length === 1 ? "conta" : "contas"} do tipo
          investimento
        </p>
      </div>

      {/* ACCOUNTS */}
      {isLoadingAccounts ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-40 rounded-2xl bg-[#0b1215] border border-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : investmentAccounts.length === 0 ? (
        <Card className="bg-[#0b1215] border border-white/5 p-10 rounded-2xl flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[#32d6a5]/10 grid place-items-center text-[#32d6a5]">
            <TrendingUp size={26} />
          </div>
          <h3 className="text-white font-semibold">
            Nenhuma conta de investimento
          </h3>
          <p className="text-gray-400 text-sm max-w-sm">
            Crie uma conta do tipo &quot;Investimento&quot; para acompanhar seu
            saldo aplicado aqui.
          </p>
          <Link href="/dashboard/accounts">
            <Button className="mt-2 bg-[#32d6a5] hover:bg-[#2bc293] text-[#020809] font-bold rounded-lg">
              <Plus size={18} className="mr-2" /> Criar conta
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investmentAccounts.map((account) => (
            <Card
              key={account.id}
              className="bg-[#0b1215] border border-white/5 p-6 rounded-2xl hover:border-[#32d6a5]/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-10 h-10 rounded-full grid place-items-center text-[#020809] font-bold text-sm"
                  style={{ backgroundColor: account.color || "#32d6a5" }}
                >
                  {account.name?.charAt(0)?.toUpperCase() ?? "I"}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">
                    {account.name}
                  </h4>
                  <p className="text-gray-500 text-xs flex items-center gap-1">
                    <Wallet size={12} /> Investimento
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1">
                  Saldo
                </p>
                <p className="text-[#32d6a5] font-bold text-xl">
                  {formatCurrency(Number(account.currentBalance ?? 0))}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
