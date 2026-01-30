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
  DialogDescription,
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
import { Loader2, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { contributeToFund, withdrawFromFund } from "@/services/emergency-fund.actions";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  amount: z.coerce.number().min(1, "Valor deve ser maior que zero"),
  reason: z.string().optional(),
});

interface FundOperationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode: "DEPOSIT" | "WITHDRAW";
}

export function FundOperationsModal({ isOpen, onClose, onSuccess, mode }: FundOperationsModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      amount: 0,
      reason: "",
    },
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
        form.reset({ amount: 0, reason: "" });
    }
  }, [isOpen, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      if (mode === "DEPOSIT") {
          await contributeToFund(values.amount);
          toast.success("Aporte realizado com sucesso!");
      } else {
          if (!values.reason) {
              form.setError("reason", { message: "Motivo é obrigatório para saques." });
              setIsSubmitting(false);
              return;
          }
          await withdrawFromFund(values.amount, values.reason);
          toast.success("Saque registrado.");
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Operation failed", error);
      toast.error("Erro ao realizar operação.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#0b1215] border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {mode === "DEPOSIT" ? (
                <>
                    <ArrowUpCircle className="text-[#32d6a5]" />
                    Aportar na Reserva
                </>
            ) : (
                <>
                    <ArrowDownCircle className="text-red-500" />
                    Realizar Saque
                </>
            )}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {mode === "DEPOSIT" 
                ? "Adicione valor à sua reserva de emergência." 
                : "Registre um saque da sua reserva. Use com sabedoria!"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0,00" {...field} className="bg-white/5 border-white/10 text-white font-mono text-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mode === "WITHDRAW" && (
                 <FormField
                 control={form.control}
                 name="reason"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Motivo do Saque</FormLabel>
                     <FormControl>
                       <Textarea placeholder="Ex: Conserto do carro, Despesas médicas..." {...field} className="bg-white/5 border-white/10 text-white" />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
            )}

            <DialogFooter className="mt-6">
                <Button type="button" variant="ghost" onClick={onClose} className="text-gray-400">Cancelar</Button>
                <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className={`${mode === "DEPOSIT" ? "bg-[#32d6a5] hover:bg-[#2ac294]" : "bg-red-500 hover:bg-red-600"} text-black font-semibold`}
                >
                    {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : "Confirmar"}
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
