import React, { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { User } from "@/types/api";
import { Button } from "@/components/ui/Button";
import { User as UserIcon, Mail } from "lucide-react";
import { toast } from "sonner";

interface ProfileFormProps {
  user: User | null;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const { updateProfile, isUpdatingProfile } = useUser();
  const [fullName, setFullName] = useState(user?.fullName || "");

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProfile({ fullName });
      toast.success("Perfil atualizado com sucesso!");
    } catch (err) {
      toast.error("Erro ao atualizar perfil.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
          Nome Completo
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#32d6a5]">
            <UserIcon size={18} />
          </div>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full pl-10 p-3 rounded-xl border border-white/10 bg-[#020809] text-white outline-none focus:border-[#32d6a5] transition-colors placeholder:text-gray-600"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
          Email
        </label>
        <div className="relative opacity-60">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#32d6a5]">
            <Mail size={18} />
          </div>
          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="w-full pl-10 p-3 rounded-xl border border-white/10 bg-white/5 text-gray-400 cursor-not-allowed"
          />
        </div>
        <p className="text-[10px] text-gray-500 mt-1">
          Para alterar seu email, entre em contato com o suporte.
        </p>
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isUpdatingProfile}
          className="w-full md:w-auto"
        >
          {isUpdatingProfile ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>
    </form>
  );
}
