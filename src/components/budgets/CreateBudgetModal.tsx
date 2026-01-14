"use client";

import { useState } from "react";
import { useCreateBudget } from "@/hooks/useBudgets";
import { useCategories } from "@/hooks/useCategories";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { CategoryType, BudgetPeriod } from "@/types/api";

interface CreateBudgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateBudgetModal({ open, onOpenChange }: CreateBudgetModalProps) {
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState<BudgetPeriod>(BudgetPeriod.MONTHLY);
  const [alertPercentage, setAlertPercentage] = useState("80");
  
  const { categories } = useCategories(CategoryType.EXPENSE);
  const { mutate: createBudget, isPending } = useCreateBudget();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoryId || !amount) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    createBudget(
      {
        categoryId,
        amount: parseFloat(amount),
        period,
        startDate: new Date().toISOString(), // Starts now
        alertPercentage: parseInt(alertPercentage),
      },
      {
        onSuccess: () => {
          toast.success("Orçamento criado!");
          onOpenChange(false);
          resetForm();
        },
        onError: () => toast.error("Erro ao criar orçamento."),
      }
    );
  };

  const resetForm = () => {
    setCategoryId("");
    setAmount("");
    setPeriod(BudgetPeriod.MONTHLY);
    setAlertPercentage("80");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#0f172a] text-white border-[#1e293b]">
        <DialogHeader>
          <DialogTitle className="text-[#00404f] dark:text-white">Novo Orçamento</DialogTitle>
          <DialogDescription className="text-gray-400">
            Defina limites de gastos para suas categorias.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select value={categoryId} onValueChange={setCategoryId} required>
              <SelectTrigger className="bg-[#1e293b] border-[#334155] text-white">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="bg-[#1e293b] border-[#334155] text-white">
                {categories?.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Limite de Gasto (R$)</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1000.00"
              className="bg-[#1e293b] border-[#334155] text-white placeholder:text-gray-500"
              required
              min="0.01"
              step="0.01"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Período</Label>
              <Select 
                value={period} 
                onValueChange={(val) => setPeriod(val as BudgetPeriod)}
              >
                <SelectTrigger className="bg-[#1e293b] border-[#334155] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1e293b] border-[#334155] text-white">
                  <SelectItem value={BudgetPeriod.WEEKLY}>Semanal</SelectItem>
                  <SelectItem value={BudgetPeriod.MONTHLY}>Mensal</SelectItem>
                  <SelectItem value={BudgetPeriod.YEARLY}>Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Alerta em (%)</Label>
              <Input
                type="number"
                value={alertPercentage}
                onChange={(e) => setAlertPercentage(e.target.value)}
                min="1"
                max="100"
                className="bg-[#1e293b] border-[#334155] text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-white"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isPending}
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
