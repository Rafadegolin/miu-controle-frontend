"use client";

import { useBudgets } from "@/hooks/useBudgets";
import { BudgetCard } from "@/components/budgets/BudgetCard";
import { CreateBudgetModal } from "@/components/budgets/CreateBudgetModal";
import { Button } from "@/components/ui/Button";
import { Plus, Wallet, Loader2 } from "lucide-react";
import { useState } from "react";

export default function BudgetsPage() {
  const { data: budgets, isLoading } = useBudgets();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#00404f]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-[#00404f]">Orçamentos</h2>
            <span className="bg-[#00404f]/10 text-[#00404f] text-xs px-2 py-1 rounded-full font-bold">
                {budgets?.length || 0}
            </span>
        </div>
        
        <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
          <Plus size={16} /> Novo Orçamento
        </Button>
      </div>

      <CreateBudgetModal 
        open={isCreateModalOpen} 
        onOpenChange={setIsCreateModalOpen} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets?.map((budget) => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}
        
        {budgets?.length === 0 && (
          <div className="col-span-full py-16 text-center border-2 border-dashed border-[#00404f]/10 rounded-2xl">
            <Wallet size={48} className="text-[#00404f]/20 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#00404f] mb-2">Sem orçamentos definidos</h3>
            <p className="text-[#00404f]/60 mb-6 max-w-md mx-auto">
              Crie orçamentos para controlar seus gastos por categoria e evitar surpresas no fim do mês.
            </p>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(true)}>
              Criar Primeiro Orçamento
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
