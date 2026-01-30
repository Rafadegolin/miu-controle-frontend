import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateGoal, useGoals } from "@/hooks/useGoals";
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
  parentId: z.string().optional(),
  distributionStrategy: z.enum(["PROPORTIONAL", "SEQUENTIAL"]).optional(),
});

interface CreateGoalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateGoalModal({ open, onOpenChange }: CreateGoalModalProps) {
  const { mutate: createGoal, isPending } = useCreateGoal();
  const { data: goals } = useGoals(); // Fetch existing goals for parent selection

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: "",
      targetAmount: 0,
      targetDate: undefined,
      icon: "🎯",
      color: "#32d6a5",
      parentId: "none",
      distributionStrategy: undefined,
    },
  });

  const parentId = form.watch("parentId");

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      form.reset({
        name: "",
        targetAmount: 0,
        targetDate: undefined,
        icon: "🎯",
        color: "#32d6a5",
        parentId: "none",
        distributionStrategy: undefined,
      });
    }
  }, [open, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const parentId = values.parentId === "none" ? undefined : values.parentId;
    
    // Validate strategy if parent is selected (though logic implies it's for the PARENT to have a strategy, 
    // but here we are setting properties on the NEW goal. 
    // Actually, usually the PARENT defines how it distributes to children. 
    // But if this new goal is a CHILD, it doesn't need a strategy.
    // Wait, the requirement says: "Quando se contribui para uma meta "Pai" que possui filhos, o valor pode ser distribuído automaticamente".
    // So if I am creating a PARENT goal, I might want to set this.
    // If I am creating a CHILD goal, I just select the parent.
    // The requirement "distributionStrategy" field on Goal likely applies when THAT goal is a parent.
    // So let's allow setting it regardless, confusing UI but flexible.
    // Better UX: If I select a parent, I am a Child. 
    // If I DON'T select a parent, I am potentially a Parent (Root).
    
    createGoal(
      {
        name: values.name,
        targetAmount: values.targetAmount,
        targetDate: values.targetDate?.toISOString(),
        icon: values.icon,
        color: values.color,
        parentId: parentId,
        distributionStrategy: !parentId ? values.distributionStrategy : undefined, // Only roots/parents need strategy
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

             {/* Parent Goal Selection */}
             <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Meta Pai (Opcional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Selecione uma meta pai" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#0b1215] border-white/10 text-white">
                      <SelectItem value="none">Nenhuma (Raiz)</SelectItem>
                      {goals?.filter(g => !g.parentId).map((goal) => (
                        <SelectItem key={goal.id} value={goal.id}>
                          {goal.icon} {goal.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* Distribution Strategy (Only show if NO parent selected, implying this IS a parent/root) */}
            {(!parentId || parentId === "none") && (
                <FormField
                control={form.control}
                name="distributionStrategy"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-gray-400">Estratégia de Distribuição (para Sub-metas)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Como distribuir aportes futuros?" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#0b1215] border-white/10 text-white">
                        <SelectItem value="PROPORTIONAL">Proporcional (Baseado no alvo)</SelectItem>
                        <SelectItem value="SEQUENTIAL">Sequencial (Por prioridade)</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                    </FormItem>
                )}
                />
            )}

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
