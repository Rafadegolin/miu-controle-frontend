import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Transaction } from "@/types/api";
import { formatCurrency } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DeleteTransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  transaction: Transaction | null;
  isDeleting: boolean;
}

export function DeleteTransactionDialog({
  isOpen,
  onClose,
  onConfirm,
  transaction,
  isDeleting,
}: DeleteTransactionDialogProps) {
  if (!transaction) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-[#06181b] border border-white/10 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Excluir Transação?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            Esta ação não pode ser desfeita. A transação será removida permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="my-4 p-4 bg-red-400/5 rounded-lg border border-red-400/20">
          <div className="space-y-2 text-sm text-gray-300">
            <div>
              <span className="font-semibold text-red-300">Descrição: </span>
              <span>{transaction.description}</span>
            </div>
            <div>
              <span className="font-semibold text-red-300">Valor: </span>
              <span>
                {formatCurrency(Number(transaction.amount))}
              </span>
            </div>
            <div>
              <span className="font-semibold text-red-300">Data: </span>
              <span>
                {format(parseISO(transaction.date), "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </span>
            </div>
            {transaction.category && (
              <div>
                <span className="font-semibold text-red-300">Categoria: </span>
                <span>{transaction.category.name}</span>
              </div>
            )}
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel 
            disabled={isDeleting}
            className="bg-transparent border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600 text-white border-0"
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
