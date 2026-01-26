"use client";

import { useForm, Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScenarioType, SimulationRequest } from "@/types/scenarios";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Loader2, Wand2 } from "lucide-react";
import { useEffect } from "react";

const formSchema = z.object({
  amount: z.coerce.number().min(1, "Valor é obrigatório"),
  description: z.string().min(3, "Descrição necessária"),
  installments: z.coerce.number().min(1).optional(),
});

interface SimulationFormProps {
  type: ScenarioType;
  onSubmit: (data: SimulationRequest) => void;
  isLoading: boolean;
}

export function SimulationForm({ type, onSubmit, isLoading }: SimulationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as Resolver<z.infer<typeof formSchema>>,
    defaultValues: {
      amount: 0,
      description: "",
      installments: 1,
    },
  });

  // Reset form when type changes
  useEffect(() => {
    form.reset({
        amount: 0,
        description: "",
        installments: type === ScenarioType.BIG_PURCHASE ? 12 : 1,
    });
  }, [type, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      type,
      ...values,
      startDate: new Date().toISOString(),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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

            {(type === ScenarioType.BIG_PURCHASE) && (
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
            Simular Agora
        </Button>
      </form>
    </Form>
  );
}
