"use client";

import { useRecurringTransactions } from "@/hooks/useRecurring";
import { RecurringCard } from "@/components/recurring/RecurringCard";
import { CreateRecurringModal } from "@/components/recurring/CreateRecurringModal";
import { Button } from "@/components/ui/Button";
import { Plus, RefreshCw, Loader2 } from "lucide-react";
import { useState } from "react";

export default function RecurringPage() {
  const { data: recurring, isLoading } = useRecurringTransactions();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#00404f]" />
      </div>
    );
  }

  // Calculate monthly stats
  const totalMonthlyExpenses = recurring?.filter(
    (r) => r.type === "EXPENSE" && r.isActive && r.frequency === "MONTHLY"
  ).reduce((acc, curr) => acc + curr.amount, 0) || 0;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-[#00404f]">Assinaturas e Recorrências</h2>
           <p className="text-sm text-[#00404f]/60">
             Custo fixo mensal estimado: <span className="font-bold text-red-500">{totalMonthlyExpenses.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
           </p>
        </div>
        
        <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
          <Plus size={16} /> Nova Recorrência
        </Button>
      </div>

      <CreateRecurringModal 
        open={isCreateModalOpen} 
        onOpenChange={setIsCreateModalOpen} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recurring?.map((item) => (
          <RecurringCard key={item.id} item={item} />
        ))}
        
        {recurring?.length === 0 && (
          <div className="col-span-full py-16 text-center border-2 border-dashed border-[#00404f]/10 rounded-2xl">
            <RefreshCw size={48} className="text-[#00404f]/20 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#00404f] mb-2">Sem recorrências cadastradas</h3>
            <p className="text-[#00404f]/60 mb-6 max-w-md mx-auto">
              Adicione suas contas fixas (aluguel, internet) e assinaturas (Netflix, Spotify) para controle automático.
            </p>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(true)}>
              Cadastrar Recorrência
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
