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
        className="w-full md:w-auto flex items-center justify-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 transition-all font-bold"
      >
        <Trash2 size={16} />
        Excluir minha conta
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#06181b] rounded-2xl border border-white/10 shadow-2xl max-w-md w-full p-6 space-y-6 animate-scale-in relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-8 -mt-8 pointer-events-none"></div>

        <div className="flex items-center gap-4 text-red-500 mb-2 relative z-10">
          <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
            <AlertTriangle size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">Excluir Conta</h3>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed">
          Esta ação é irreversível. Todos os seus dados, transações, metas e configurações serão apagados permanentemente.
        </p>

        <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/10 text-xs text-red-400">
          Para confirmar, digite <strong>{CONFIRMATION_TEXT}</strong> no campo abaixo.
        </div>

        <input
          type="text"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          placeholder="Digite DELETAR"
          className="w-full p-3 bg-[#020809] border border-white/10 rounded-xl text-white focus:border-red-500 outline-none transition-colors placeholder:text-gray-600"
        />

        {error && <p className="text-red-500 text-xs font-bold">{error}</p>}

        <div className="flex gap-3 justify-end mt-4">
          <Button
            variant="ghost"
            onClick={() => {
              setIsOpen(false);
              setConfirmation("");
              setError("");
            }}
            disabled={isDeletingAccount}
            className="text-gray-400 hover:text-white hover:bg-white/5"
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeletingAccount || confirmation !== CONFIRMATION_TEXT}
            className="bg-red-600 text-white hover:bg-red-700 font-bold border-0"
          >
            {isDeletingAccount ? "Excluindo..." : "Sim, excluir tudo"}
          </Button>
        </div>
      </div>
    </div>
  );
}
