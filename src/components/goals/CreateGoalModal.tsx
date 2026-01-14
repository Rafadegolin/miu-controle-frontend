"use client";

import { useEffect, useState } from "react"; // Added useEffect/useState
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateGoal } from "@/hooks/useGoals";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Loader2, CalendarIcon } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  targetAmount: z.coerce.number().min(0.01, "Valor deve ser maior que zero"),
  targetDate: z.date().optional(),
  icon: z.string().min(1, "Ícone é obrigatório"),
  color: z.string().min(1, "Cor é obrigatória"),
});

interface CreateGoalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateGoalModal({ open, onOpenChange }: CreateGoalModalProps) {
  const { mutate: createGoal, isPending } = useCreateGoal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: "",
      targetAmount: 0,
      targetDate: undefined,
      icon: "🎯",
      color: "#32d6a5",
    },
  });

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      form.reset({
        name: "",
        targetAmount: 0,
        targetDate: undefined,
        icon: "🎯",
        color: "#32d6a5",
      });
    }
  }, [open, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createGoal(
      {
        name: values.name,
        targetAmount: values.targetAmount,
        targetDate: values.targetDate?.toISOString(),
        icon: values.icon,
        color: values.color,
      },
      {
        onSuccess: () => {
          toast.success("Meta criada com sucesso!");
          onOpenChange(false);
          form.reset();
        },
        onError: (error) => {
          toast.error("Erro ao criar meta.");
          console.error(error);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-[#06181b] border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Nova Meta</DialogTitle>
          <DialogDescription className="text-gray-400">
            Defina seu objetivo financeiro e comece a poupar.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Nome da Meta</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Viagem para Europa"
                      {...field}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#32d6a5]/50"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* Target Amount */}
            <FormField
              control={form.control}
              name="targetAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Valor Alvo (R$)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      className="text-lg font-bold bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#32d6a5]/50"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* Date - Optional */}
            <FormField
              control={form.control}
              name="targetDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Data Alvo (Opcional)</FormLabel>
                   <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-[#06181b] border-white/10 text-white" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className="bg-[#06181b] text-white"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {/* Icon */}
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">Ícone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white/5 border-white/10 text-white text-center text-2xl focus:border-[#32d6a5]/50"
                        maxLength={2}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Color */}
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">Cor</FormLabel>
                    <FormControl>
                      <div className="flex gap-2 items-center h-10">
                        <Input
                          type="color"
                          {...field}
                          className="w-full h-full p-1 bg-white/5 border-white/10 cursor-pointer"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="gap-2 pt-4">
              <Button
                type="button"
                className="bg-transparent border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[#32d6a5] text-[#020809] font-bold hover:bg-[#20bca3]"
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Criar Meta
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
