"use client";

import { useState } from "react";
import { useCreateRecurringTransaction } from "@/hooks/useRecurring";
import { useCategories } from "@/hooks/useCategories";
import { useAccounts } from "@/hooks/useAccounts";
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
import { TransactionType, RecurringFrequency, CategoryType } from "@/types/api";

interface CreateRecurringModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateRecurringModal({ open, onOpenChange }: CreateRecurringModalProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [categoryId, setCategoryId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [frequency, setFrequency] = useState<RecurringFrequency>(RecurringFrequency.MONTHLY);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [autoCreate, setAutoCreate] = useState(true);

  const { categories } = useCategories(type === TransactionType.EXPENSE ? CategoryType.EXPENSE : CategoryType.INCOME);
  const { accounts } = useAccounts();
  const { mutate: createRecurring, isPending } = useCreateRecurringTransaction();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !amount || !accountId) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    createRecurring(
      {
        description,
        amount: parseFloat(amount),
        type,
        categoryId: categoryId || undefined,
        accountId,
        frequency,
        startDate: new Date(startDate).toISOString(),
        autoCreate,
        interval: 1, // Default to 1 for now (e.g. every 1 month)
      },
      {
        onSuccess: () => {
          toast.success("Recorrência criada!");
          onOpenChange(false);
          resetForm();
        },
        onError: () => toast.error("Erro ao criar recorrência."),
      }
    );
  };

  const resetForm = () => {
    setDescription("");
    setAmount("");
    setType(TransactionType.EXPENSE);
    setCategoryId("");
    setAccountId("");
    setFrequency(RecurringFrequency.MONTHLY);
    setStartDate(new Date().toISOString().split('T')[0]);
    setAutoCreate(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#0f172a] text-white border-[#1e293b]">
        <DialogHeader>
          <DialogTitle className="text-[#00404f] dark:text-white">Nova Assinatura / Recorrência</DialogTitle>
          <DialogDescription className="text-gray-400">
            Cadastre contas fixas ou assinaturas automáticas.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label>Descrição</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Netflix, Aluguel"
                className="bg-[#1e293b] border-[#334155] text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Valor (R$)</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="bg-[#1e293b] border-[#334155] text-white"
                required
                min="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select value={type} onValueChange={(val) => setType(val as TransactionType)}>
                <SelectTrigger className="bg-[#1e293b] border-[#334155] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1e293b] border-[#334155] text-white">
                  <SelectItem value={TransactionType.EXPENSE}>Despesa</SelectItem>
                  <SelectItem value={TransactionType.INCOME}>Receita</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Conta</Label>
              <Select value={accountId} onValueChange={setAccountId} required>
                 <SelectTrigger className="bg-[#1e293b] border-[#334155] text-white">
                  <SelectValue placeholder="Conta" />
                </SelectTrigger>
                <SelectContent className="bg-[#1e293b] border-[#334155] text-white">
                  {accounts?.map((acc) => (
                    <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Frequência</Label>
              <Select value={frequency} onValueChange={(val) => setFrequency(val as RecurringFrequency)}>
                <SelectTrigger className="bg-[#1e293b] border-[#334155] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1e293b] border-[#334155] text-white">
                  <SelectItem value={RecurringFrequency.WEEKLY}>Semanal</SelectItem>
                  <SelectItem value={RecurringFrequency.MONTHLY}>Mensal</SelectItem>
                  <SelectItem value={RecurringFrequency.YEARLY}>Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Categoria</Label>
             <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="bg-[#1e293b] border-[#334155] text-white">
                  <SelectValue placeholder="Opcional" />
                </SelectTrigger>
                <SelectContent className="bg-[#1e293b] border-[#334155] text-white">
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                        <span className="flex items-center gap-2">
                           <span>{cat.icon}</span>
                           <span>{cat.name}</span>
                        </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
          </div>

          <div className="space-y-2">
            <Label>Data de Início</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-[#1e293b] border-[#334155] text-white scheme-dark"
            />
          </div>
          
           <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="autoCreate"
                checked={autoCreate}
                onChange={(e) => setAutoCreate(e.target.checked)}
                className="w-4 h-4"
              />
              <Label htmlFor="autoCreate" className="cursor-pointer">Lançar automaticamente</Label>
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
