import React, { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/Button";
import { Eye, EyeOff, Lock } from "lucide-react";

export function ChangePasswordForm() {
  const { changePassword, isChangingPassword } = useUser();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("A nova senha e a confirmação não coincidem.");
      return;
    }

    if (newPassword.length < 8) {
      setError("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword });
      setSuccess("Senha alterada com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao alterar senha.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-200">
          {success}
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-[#00404f]/60 uppercase mb-1">
          Senha Atual
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00404f]/40">
            <Lock size={18} />
          </div>
          <input
            type={showCurrent ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full pl-10 pr-10 p-3 rounded-lg border border-[#00404f]/10 bg-[#F8FAFC] outline-none focus:border-[#3c88a0] transition-colors"
            required
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00404f]/40 hover:text-[#00404f]"
          >
            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#00404f]/60 uppercase mb-1">
          Nova Senha
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00404f]/40">
            <Lock size={18} />
          </div>
          <input
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full pl-10 pr-10 p-3 rounded-lg border border-[#00404f]/10 bg-[#F8FAFC] outline-none focus:border-[#3c88a0] transition-colors"
            required
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00404f]/40 hover:text-[#00404f]"
          >
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <p className="text-[10px] text-[#00404f]/50 mt-1">
          Mínimo de 8 caracteres, maiúsculas, minúsculas e números.
        </p>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#00404f]/60 uppercase mb-1">
          Confirmar Nova Senha
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00404f]/40">
            <Lock size={18} />
          </div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full pl-10 p-3 rounded-lg border border-[#00404f]/10 bg-[#F8FAFC] outline-none focus:border-[#3c88a0] transition-colors"
            required
          />
        </div>
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isChangingPassword}
          className="w-full md:w-auto"
        >
          {isChangingPassword ? "Alterando..." : "Alterar Senha"}
        </Button>
      </div>
    </form>
  );
}
