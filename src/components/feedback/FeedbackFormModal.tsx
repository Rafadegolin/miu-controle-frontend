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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/Button";
import { Loader2, Bug, Lightbulb, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { feedbackActions } from "@/services/feedback.actions";

const formSchema = z.object({
  title: z.string().min(3, "Título muito curto"),
  type: z.enum(["BUG", "SUGGESTION", "OTHER"]),
  description: z.string().min(10, "Descreva com mais detalhes"),
});

interface FeedbackFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function FeedbackFormModal({ open, onOpenChange, onSuccess }: FeedbackFormModalProps) {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "BUG",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsPending(true);
    try {
      await feedbackActions.submitFeedback(values);
      toast.success("Feedback enviado! Agradecemos sua contribuição.");
      onSuccess();
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast.error("Erro ao enviar feedback.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-[#06181b] border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <MessageSquare size={20} className="text-[#32d6a5]" />
            Enviar Feedback
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Encontrou um erro ou tem uma ideia? Conta pra gente!
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Título</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Resumo do problema ou ideia"
                      {...field}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#32d6a5]/50"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Tipo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#0b1215] border-white/10 text-white">
                      <SelectItem value="BUG">
                         <div className="flex items-center gap-2"><Bug size={14} className="text-red-400"/> Reportar Erro (Bug)</div>
                      </SelectItem>
                      <SelectItem value="SUGGESTION">
                         <div className="flex items-center gap-2"><Lightbulb size={14} className="text-yellow-400"/> Sugestão de Melhoria</div>
                      </SelectItem>
                      <SelectItem value="OTHER">
                         <div className="flex items-center gap-2"><MessageSquare size={14} className="text-blue-400"/> Outro</div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Conte os detalhes..."
                      {...field}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#32d6a5]/50 min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-2">
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
                Enviar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
