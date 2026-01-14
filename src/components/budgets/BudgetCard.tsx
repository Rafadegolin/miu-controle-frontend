"use client";

import { useBudgetStatus, useDeleteBudget } from "@/hooks/useBudgets";
import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/Button";
import { Trash2, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import type { Budget } from "@/types/api";

export function BudgetCard({ budget }: { budget: Budget }) {
  const { data: status, isLoading } = useBudgetStatus(budget.id);
  const { mutate: deleteBudget } = useDeleteBudget();

  const handleDelete = () => {
    if (confirm("Deletar este orçamento?")) {
      deleteBudget(budget.id, {
        onSuccess: () => toast.success("Orçamento removido."),
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="h-40 animate-pulse bg-gray-100 dark:bg-gray-800 border-none" />
    );
  }

  if (!status) return null;

  const { percentage, spent, remaining, isOverBudget } = status;
  
  // Color logic
  let progressColor = "bg-green-500";
  if (percentage > 80) progressColor = "bg-yellow-500";
  if (percentage >= 100) progressColor = "bg-red-500";

  return (
    <Card className="p-5 flex flex-col gap-4 relative overflow-hidden group">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={`
             w-10 h-10 rounded-xl flex items-center justify-center text-lg
             shadow-lg
          `} style={{ backgroundColor: budget.category?.color || '#333' }}>
            {budget.category?.icon || "💰"}
          </div>
          <div>
            <h3 className="font-bold text-[#00404f]">{budget.category?.name || "Geral"}</h3>
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              {budget.period === "MONTHLY" ? "Mensal" : budget.period}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="font-bold text-[#00404f]">
            {budget.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
          <button 
            onClick={handleDelete} 
            className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span className={isOverBudget ? "text-red-500" : "text-gray-600"}>
            {spent.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} gasto
          </span>
          <span className="text-gray-400">
            {Math.round(percentage)}%
          </span>
        </div>
        
        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full ${progressColor} transition-all duration-500`} 
            style={{ width: `${Math.min(percentage, 100)}%` }} 
          />
        </div>

        <div className="flex items-center gap-2 text-xs mt-1">
          {isOverBudget ? (
            <span className="text-red-500 flex items-center gap-1 font-bold">
              <AlertTriangle size={12} /> Excedido em {Math.abs(remaining).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          ) : (
            <span className="text-green-600 flex items-center gap-1">
              <CheckCircle size={12} /> Restam {remaining.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
