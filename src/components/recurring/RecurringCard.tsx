"use client";

import { useToggleRecurringTransaction, useDeleteRecurringTransaction, useProcessRecurringTransaction } from "@/hooks/useRecurring";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Calendar, Trash2, Repeat, Play, Power, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import type { RecurringTransaction } from "@/types/api";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function RecurringCard({ item }: { item: RecurringTransaction }) {
  const { mutate: toggleActive } = useToggleRecurringTransaction();
  const { mutate: deleteRecurring } = useDeleteRecurringTransaction();
  const { mutate: processNow, isPending: isProcessing } = useProcessRecurringTransaction();

  const handleDelete = () => {
    deleteRecurring(item.id, {
        onSuccess: () => toast.success("Removido com sucesso."),
    });
  };

  const handleToggle = () => {
    toggleActive(item.id, {
        onSuccess: () => toast.success(item.isActive ? "Pausado" : "Reativado")
    });
  };

  const handleProcessNow = () => {
      processNow(item.id, {
          onSuccess: () => toast.success("Transação gerada com sucesso!")
      });
  }

  return (
    <Card className={`group relative overflow-hidden p-5 transition-all duration-300 border backdrop-blur-sm rounded-xl
        ${item.isActive 
            ? 'bg-white/5 border-white/10 hover:border-white/20' 
            : 'bg-white/5 border-white/5 grayscale-[0.8] hover:grayscale-0 opacity-70 hover:opacity-100'
        }
    `}>
      <div className="flex justify-between items-start relative z-10">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
             <div className={`p-2.5 rounded-xl ${item.type === 'INCOME' ? 'bg-[#32d6a5]/10 text-[#32d6a5]' : 'bg-red-500/10 text-red-400'}`}>
                {item.type === 'INCOME' ? <Repeat size={20} /> : <Repeat size={20} />}
             </div>
             <div>
                <h3 className={`font-bold text-base leading-tight ${item.isActive ? 'text-white' : 'text-gray-400'}`}>
                    {item.description}
                </h3>
                <span className="text-xs text-gray-400 font-medium block mt-1">
                    {item.frequency === 'MONTHLY' ? 'Mensal' : item.frequency === 'WEEKLY' ? 'Semanal' : 'Anual'} • Dia {item.dayOfMonth || 1}
                </span>
             </div>
          </div>
          
          <div className="pt-1">
             <p className="text-gray-400 text-xs mb-1">Valor</p>
             <p className={`text-2xl font-bold tracking-tight ${item.type === 'INCOME' ? 'text-[#32d6a5]' : 'text-red-400'}`}>
                {item.type === 'INCOME' ? '+' : '-'} {item.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
            <TooltipProvider>
                <div className="flex gap-2">
                    {/* BUTTON: PROCESS NOW */}
                    <AlertDialog>
                      <Tooltip>
                          <AlertDialogTrigger asChild>
                            <TooltipTrigger asChild>
                                <Button 
                                    variant="ghost" 
                                    size="icon"
                                    disabled={isProcessing || !item.isActive}
                                    className={`h-8 w-8 rounded-full ${isProcessing ? "animate-spin" : ""} text-blue-400 hover:text-blue-300 hover:bg-blue-400/10`}
                                >
                                    <Play size={16} className="fill-current" />
                                </Button>
                            </TooltipTrigger>
                          </AlertDialogTrigger>
                          <TooltipContent>Processar Agora</TooltipContent>
                      </Tooltip>
                      <AlertDialogContent className="bg-[#0f172a] border-white/10 text-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Processar manualmente?</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-400">
                            Isso criará uma transação oficial imediatamente com a data de hoje.
                            A próxima data de cobrança automática será atualizada.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={handleProcessNow} className="bg-[#32d6a5] text-black hover:bg-[#25b58a]">Confirmar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    {/* BUTTON: TOGGLE */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                             <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={handleToggle}
                                className={`h-8 w-8 rounded-full ${item.isActive ? "text-[#32d6a5] hover:text-[#32d6a5] hover:bg-[#32d6a5]/10" : "text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"}`}
                            >
                                <Power size={16} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>{item.isActive ? "Pausar" : "Ativar"}</TooltipContent>
                    </Tooltip>

                    {/* BUTTON: DELETE */}
                    <AlertDialog> 
                        <Tooltip>
                            <AlertDialogTrigger asChild>
                                <TooltipTrigger asChild>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 rounded-full text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </TooltipTrigger>
                            </AlertDialogTrigger>
                            <TooltipContent>Excluir</TooltipContent>
                        </Tooltip>
                        <AlertDialogContent className="bg-[#0f172a] border-white/10 text-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir recorrência?</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-400">
                            Esta ação não pode ser desfeita. O histórico de transações já geradas será mantido, mas nenhuma nova transação será criada.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete} className="bg-red-500 text-white hover:bg-red-600">Excluir</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </div>
            </TooltipProvider>

            {!item.isActive && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-yellow-500/10 rounded-md border border-yellow-500/20 self-end mt-1">
                    <AlertCircle size={12} className="text-yellow-500" />
                    <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-wide">Pausado</span>
                </div>
            )}
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-xs text-gray-500">
        <span>Próx: {new Date().toLocaleDateString('pt-BR')} (Estimado)</span>
        <span>{item.autoCreate ? "Automático" : "Manual"}</span>
      </div>
    </Card>
  );
}
