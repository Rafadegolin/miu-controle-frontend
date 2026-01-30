"use client";

import { useEffect, useState } from "react";
import { getBudgetsSummary } from "@/services/budgets.actions";
import { BudgetsSummaryResponse } from "@/types/api";
import { BudgetSummaryCards } from "@/components/budgets/BudgetSummaryCards";
import { BudgetCard } from "@/components/budgets/BudgetCard";
import { CreateBudgetModal } from "@/components/budgets/CreateBudgetModal";
import { Button } from "@/components/ui/Button";
import { Plus, SlidersHorizontal, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function BudgetsPage() {
  const [data, setData] = useState<BudgetsSummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function load() {
    setIsLoading(true);
    try {
        const res = await getBudgetsSummary();
        setData(res);
    } catch {
        toast.error("Erro ao carregar orçamentos.");
    } finally {
        setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-[#32d6a5] w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Orçamentos</h1>
          <p className="text-gray-400">Planeje limites de gastos para suas categorias.</p>
        </div>
        <div className="flex gap-2">
            
            <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#32d6a5] text-black hover:bg-[#2bc496] shadow-lg shadow-[#32d6a5]/20"
            >
                <Plus className="mr-2 h-4 w-4" /> Novo Orçamento
            </Button>
        </div>
      </div>

      {/* Summary Cards */}
      {data && <BudgetSummaryCards data={data} />}

      {/* Budgets Grid */}
      <h2 className="text-xl font-bold text-white mt-8 mb-4">Meus Orçamentos</h2>
      
      {data && data.budgets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.budgets.map((item) => (
                <BudgetCard key={item.budget.id} data={item} />
            ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/5 rounded-xl border border-white/5 border-dashed">
            <SlidersHorizontal className="mx-auto h-12 w-12 text-gray-600 mb-4" />
            <h3 className="text-lg font-bold text-white">Nenhum orçamento definido</h3>
            <p className="text-gray-400 mb-6">Crie limites para ajudar no seu controle financeiro.</p>
            <Button variant="outline" onClick={() => setIsModalOpen(true)} className="border-white/10 text-white hover:bg-white/5">
                Criar Primeiro Orçamento
            </Button>
        </div>
      )}

      <CreateBudgetModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => {
            toast.success("Orçamento criado!");
            load();
        }}
    />
    </div>
  );
}
