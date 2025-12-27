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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Transação?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. A transação será removida permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="my-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-semibold text-gray-700">Descrição: </span>
              <span className="text-gray-900">{transaction.description}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Valor: </span>
              <span className="text-gray-900">
                {formatCurrency(Number(transaction.amount))}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Data: </span>
              <span className="text-gray-900">
                {format(parseISO(transaction.date), "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </span>
            </div>
            {transaction.category && (
              <div>
                <span className="font-semibold text-gray-700">Categoria: </span>
                <span className="text-gray-900">{transaction.category.name}</span>
              </div>
            )}
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
