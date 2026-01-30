"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import api from "@/services/api";
import { createBudget } from "@/services/budgets.actions";
import { Category, BudgetPeriod, CategoryType } from "@/types/api";

const formSchema = z.object({
  categoryId: z.string().min(1, "Selecione uma categoria"),
  amount: z.coerce.number().min(1, "Valor deve ser maior que zero"),
  period: z.nativeEnum(BudgetPeriod),
  alertPercentage: z.coerce.number().min(1).max(100),
});

interface CreateBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateBudgetModal({ isOpen, onClose, onSuccess }: CreateBudgetModalProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      categoryId: "",
      amount: 0,
      period: BudgetPeriod.MONTHLY,
      alertPercentage: 80,
    },
  });

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const categoriesData = await api.getCategories();
      // Filter only expense categories
      setCategories(categoriesData.filter((c: Category) => c.type === CategoryType.EXPENSE));
    } catch (error) {
      console.error("Failed to load categories", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await createBudget({
          ...values,
          startDate: new Date().toISOString()
      });
      form.reset();
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to create budget", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#0b1215] border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Novo Orçamento</DialogTitle>
        </DialogHeader>

        {isLoading ? (
           <div className="flex justify-center p-4">
             <Loader2 className="animate-spin text-[#32d6a5]" />
           </div>
        ) : (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                
                <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#0b1215] border-white/10 text-white">
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Limite de Gasto</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="0,00" {...field} className="bg-white/5 border-white/10 text-white" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Período</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#0b1215] border-white/10 text-white">
                            <SelectItem value={BudgetPeriod.MONTHLY}>Mensal</SelectItem>
                            <SelectItem value={BudgetPeriod.WEEKLY}>Semanal</SelectItem>
                            <SelectItem value={BudgetPeriod.YEARLY}>Anual</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="alertPercentage"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Alerta em (%)</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} className="bg-white/5 border-white/10 text-white" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={onClose} className="text-gray-400">Cancelar</Button>
                    <Button type="submit" disabled={isSubmitting} className="bg-[#32d6a5] text-black hover:bg-[#2ac294]">
                        {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : "Criar Orçamento"}
                    </Button>
                </DialogFooter>
            </form>
            </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
