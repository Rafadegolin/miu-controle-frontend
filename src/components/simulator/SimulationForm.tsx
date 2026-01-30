"use client";

import { useForm, Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScenarioType, SimulationRequest } from "@/types/scenarios";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Wand2 } from "lucide-react";
import { useEffect, useState } from "react";
import { categoriesActions } from "@/services/categories.actions";
import { Category } from "@/types/api";

const formSchema = z.object({
  amount: z.coerce.number().min(1, "Valor é obrigatório"),
  description: z.string().min(3, "Descrição necessária"),
  installments: z.coerce.number().min(1).optional(),
  categoryId: z.string().optional(),
});

interface SimulationFormProps {
  type: ScenarioType;
  onSubmit: (data: SimulationRequest) => void;
  isLoading: boolean;
}

export function SimulationForm({ type, onSubmit, isLoading }: SimulationFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
      // Load categories if type is AFFORDABILITY
      if (type === ScenarioType.AFFORDABILITY) {
          categoriesActions.getCategories("EXPENSE").then(setCategories).catch(console.error);
      }
  }, [type]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as Resolver<z.infer<typeof formSchema>>,
    defaultValues: {
      amount: 0,
      description: "",
      installments: 1,
      categoryId: undefined,
    },
  });

  // Reset form when type changes
  useEffect(() => {
    form.reset({
        amount: 0,
        description: "",
        installments: type === ScenarioType.BIG_PURCHASE ? 12 : 1,
        categoryId: undefined,
    });
  }, [type, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Validate category for Affordability
    if (type === ScenarioType.AFFORDABILITY && !values.categoryId) {
        form.setError("categoryId", { message: "Selecione uma categoria" });
        return;
    }

    onSubmit({
      type,
      ...values,
      startDate: new Date().toISOString(),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {type !== ScenarioType.AFFORDABILITY && (
             <FormField
               control={form.control}
               name="description"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Descrição</FormLabel>
                   <FormControl>
                     <Input placeholder="Ex: Novo Carro, Reforma..." {...field} className="bg-white/5 border-white/10 text-white" />
                   </FormControl>
                   <FormMessage />
                 </FormItem>
               )}
             />
        )}
        
        {type === ScenarioType.AFFORDABILITY && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField
                   control={form.control}
                   name="description"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>O que você quer comprar?</FormLabel>
                       <FormControl>
                         <Input placeholder="Ex: Tênis novo" {...field} className="bg-white/5 border-white/10 text-white" />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
                 <FormField
                   control={form.control}
                   name="categoryId"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>Categoria</FormLabel>
                       <Select onValueChange={field.onChange} value={field.value}>
                           <FormControl>
                             <SelectTrigger className="bg-white/5 border-white/10 text-white">
                               <SelectValue placeholder="Selecione..." />
                             </SelectTrigger>
                           </FormControl>
                           <SelectContent className="bg-[#0b1215] border-white/10 text-white">
                               {categories.map(c => (
                                   <SelectItem key={c.id} value={c.id}>{c.icon} {c.name}</SelectItem>
                               ))}
                           </SelectContent>
                       </Select>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
             </div>
        )}

        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Valor (R$)</FormLabel>
                <FormControl>
                    <Input type="number" step="0.01" {...field} className="bg-white/5 border-white/10 text-lg font-bold text-[#32d6a5]" />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            {(type === ScenarioType.BIG_PURCHASE || type === ScenarioType.AFFORDABILITY) && (
             <FormField
                control={form.control}
                name="installments"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Parcelas</FormLabel>
                    <FormControl>
                        <Input type="number" min="1" max="60" {...field} className="bg-white/5 border-white/10 text-white" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            )}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full bg-[#32d6a5] text-black hover:bg-[#25b58a] font-bold h-12 text-lg shadow-[0_0_20px_rgba(50,214,165,0.3)]">
            {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <Wand2 className="mr-2" />}
            {type === ScenarioType.AFFORDABILITY ? "Verificar Viabilidade" : "Simular Agora"}
        </Button>
      </form>
    </Form>
  );
}
