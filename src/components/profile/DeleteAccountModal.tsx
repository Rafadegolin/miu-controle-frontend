import React, { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, Trash2 } from "lucide-react";

export function DeleteAccountModal() {
  const { deleteAccount, isDeletingAccount } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");

  const CONFIRMATION_TEXT = "DELETAR";

  const handleDelete = async () => {
    if (confirmation !== CONFIRMATION_TEXT) {
      setError(`Digite "${CONFIRMATION_TEXT}" para confirmar.`);
      return;
    }

    try {
      await deleteAccount();
    } catch (err) {
      setError("Erro ao deletar conta. Tente novamente.");
      console.error(err);
    }
  };

  if (!isOpen) {
    return (
      <Button
        variant="destructive"
        onClick={() => setIsOpen(true)}
        className="w-full md:w-auto flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
      >
        <Trash2 size={16} />
        Excluir minha conta
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4 animate-scale-in">
        <div className="flex items-center gap-3 text-red-600 mb-2">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertTriangle size={24} />
          </div>
          <h3 className="text-xl font-bold">Excluir Conta</h3>
        </div>

        <p className="text-gray-600 text-sm">
          Esta ação é irreversível. Todos os seus dados, transações, metas e configurações serão apagados permanentemente.
        </p>

        <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-xs text-red-800">
          Para confirmar, digite <strong>{CONFIRMATION_TEXT}</strong> no campo abaixo.
        </div>

        <input
          type="text"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          placeholder="Digite DELETAR"
          className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 outline-none transition-colors"
        />

        {error && <p className="text-red-600 text-xs">{error}</p>}

        <div className="flex gap-3 justify-end mt-4">
          <Button
            variant="ghost"
            onClick={() => {
              setIsOpen(false);
              setConfirmation("");
              setError("");
            }}
            disabled={isDeletingAccount}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeletingAccount || confirmation !== CONFIRMATION_TEXT}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {isDeletingAccount ? "Excluindo..." : "Sim, excluir tudo"}
          </Button>
        </div>
      </div>
    </div>
  );
}
