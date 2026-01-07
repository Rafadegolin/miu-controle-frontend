import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as LucideIcons from "lucide-react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/services/api";
import { Account, Category, TransactionType } from "@/types/api";

// Helper to render dynamic Lucide icons
const DynamicIcon = ({ name, size = 16 }: { name: string; size?: number }) => {
  const Icon = (LucideIcons as any)[name];
  return Icon ? <Icon size={size} /> : <span>{name}</span>;
};

const formSchema = z.object({
  description: z.string().min(3, "Descrição deve ter pelo menos 3 caracteres"),
  amount: z.coerce.number().min(0.01, "Valor deve ser maior que zero"),
  date: z.date(),
  categoryId: z.string().min(1, "Selecione uma categoria"),
  accountId: z.string().min(1, "Selecione uma conta"),
  type: z.enum([TransactionType.INCOME, TransactionType.EXPENSE]),
  notes: z.string().optional(),
  tags: z.string().optional(), // We'll handle comma separated
  isRecurring: z.boolean().default(false),
  recurrencePattern: z.string().optional(),
});

interface CreateTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateTransactionModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateTransactionModalProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      description: "",
      amount: 0,
      date: new Date(),
      categoryId: "",
      accountId: "",
      type: TransactionType.EXPENSE,
      notes: "",
      tags: "",
      isRecurring: false,
    },
  });

  const transactionType = form.watch("type");

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [accountsData, categoriesData] = await Promise.all([
        api.getAccounts(true),
        api.getCategories(),
      ]);
      setAccounts(accountsData);
      setCategories(categoriesData);

      // Set default account if available
      if (accountsData.length > 0 && !form.getValues("accountId")) {
        form.setValue("accountId", accountsData[0].id);
      }
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const tagsArray = values.tags
        ? values.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [];

      await api.createTransaction({
        ...values,
        date: format(values.date, "yyyy-MM-dd"),
        tags: tagsArray,
        source: "MANUAL",
      });

      form.reset();
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to create transaction", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCategories = categories.filter(
    (c) => c.type === (transactionType as unknown as string)
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-[#06181b] border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Nova Transação</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin text-[#32d6a5]" />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Tabs
                defaultValue={TransactionType.EXPENSE}
                onValueChange={(v) =>
                  form.setValue("type", v as TransactionType)
                }
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 bg-white/5 p-1 rounded-xl">
                  <TabsTrigger 
                    value={TransactionType.EXPENSE}
                    className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400 text-gray-400"
                  >
                    Despesa
                  </TabsTrigger>
                  <TabsTrigger 
                    value={TransactionType.INCOME}
                    className="data-[state=active]:bg-[#32d6a5]/20 data-[state=active]:text-[#32d6a5] text-gray-400"
                  >
                    Receita
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-400">Valor</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0,00"
                          {...field}
                          className="text-lg font-bold bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#32d6a5]/50"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-400">Data</FormLabel>
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
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">Descrição</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ex: Almoço, Salário..." 
                        {...field} 
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#32d6a5]/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-400">Categoria</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-[#32d6a5]/50 focus:ring-1">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#020809] border-white/10 text-white">
                          {filteredCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id} className="focus:bg-white/10 focus:text-white">
                              <span className="flex items-center gap-2">
                                <DynamicIcon name={category.icon || ""} size={16} />
                                {category.name}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-400">Conta</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-[#32d6a5]/50 focus:ring-1">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#020809] border-white/10 text-white">
                          {accounts.map((account) => (
                            <SelectItem key={account.id} value={account.id} className="focus:bg-white/10 focus:text-white">
                              <span className="flex items-center gap-2">
                                {account.name}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  className="bg-transparent border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-[#32d6a5] text-[#020809] font-bold hover:bg-[#20bca3]"
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Salvar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
