"use client";

import { useToggleRecurringTransaction, useDeleteRecurringTransaction } from "@/hooks/useRecurring";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Calendar, Trash2, Repeat } from "lucide-react";
import { toast } from "sonner";
import type { RecurringTransaction } from "@/types/api";

export function RecurringCard({ item }: { item: RecurringTransaction }) {
  const { mutate: toggleActive } = useToggleRecurringTransaction();
  const { mutate: deleteRecurring } = useDeleteRecurringTransaction();

  const handleDelete = () => {
    if (confirm("Remover esta recorrência?")) {
      deleteRecurring(item.id, {
        onSuccess: () => toast.success("Removido com sucesso."),
      });
    }
  };

  const handleToggle = () => {
    toggleActive(item.id, {
        onSuccess: () => toast.success(item.isActive ? "Pausado" : "Reativado")
    });
  };

  return (
    <Card className={`p-4 transition-all border-l-4 ${item.isActive ? 'border-l-[#7cddb1]' : 'border-l-gray-300'} hover:shadow-md`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
             <h3 className={`font-bold text-lg ${item.isActive ? 'text-[#00404f]' : 'text-gray-400'}`}>
                {item.description}
             </h3>
             {!item.isActive && <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded">Pausado</span>}
          </div>
          
          <p className={`text-xl font-bold mb-2 ${item.type === 'INCOME' ? 'text-green-600' : 'text-red-500'}`}>
             {item.type === 'INCOME' ? '+' : '-'} {item.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm text-[#00404f]/60">
             <div className="flex items-center gap-1">
                <Repeat size={14} />
                <span>{item.frequency === 'MONTHLY' ? 'Mensal' : item.frequency === 'WEEKLY' ? 'Semanal' : 'Anual'}</span>
             </div>

          </div>
        </div>

        <div className="flex flex-col gap-2">
            <Button 
                variant={item.isActive ? "default" : "secondary"} 
                size="sm"
                onClick={handleToggle}
                className={item.isActive ? "bg-green-100 text-green-700 hover:bg-green-200" : ""}
            >
                {item.isActive ? "Ativo" : "Inativo"}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDelete} className="text-red-400 hover:text-red-600">
                <Trash2 size={16} />
            </Button>
        </div>
      </div>
    </Card>
  );
}
