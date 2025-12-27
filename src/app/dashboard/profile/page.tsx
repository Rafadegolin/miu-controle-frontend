"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/hooks/useUser";
import { DeleteAccountModal } from "@/components/profile/DeleteAccountModal";
import { AvatarUpload } from "@/components/profile/AvatarUpload";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const { user, logout, isLoading } = useAuth();
  const { changePassword, isChangingPassword } = useUser();
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // ... (getPasswordStrength function same as before) ...
  const getPasswordStrength = (password: string) => {
      if (!password) return { score: 0, label: "Vazia", color: "bg-gray-200" };
      let score = 0;
      if (password.length > 8) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;
  
      if (score <= 1) return { score, label: "Fraca", color: "bg-red-500" };
      if (score === 2) return { score, label: "Média", color: "bg-yellow-500" };
      if (score === 3) return { score, label: "Forte", color: "bg-blue-500" };
      return { score, label: "Muito Forte", color: "bg-green-500" };
    };

  const strength = getPasswordStrength(passwordForm.newPassword);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      toast.error("As novas senhas não coincidem.");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success("Senha alterada com sucesso! Redirecionando para login...");
      
      // Auto logout after 2 seconds
      setTimeout(() => {
        logout();
      }, 2000);

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Erro ao alterar senha. Verifique sua senha atual."
      );
    }
  };

  if (isLoading) {
      return (
          <div className="space-y-6">
              <Skeleton className="h-8 w-40 mb-6" />
              <div className="flex flex-col md:flex-row gap-6">
                <Skeleton className="h-[200px] w-full md:w-1/2 rounded-xl" />
                <Skeleton className="h-[200px] w-full md:w-1/2 rounded-xl" />
              </div>
              <Skeleton className="h-[400px] w-full rounded-xl" />
          </div>
      )
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-[#00404f]">Perfil</h2>

      <Card className="flex flex-col md:flex-row items-center gap-8 p-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#7cddb1] opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        
        {/* Avatar Upload Component */}
        <AvatarUpload user={user} />

        <div className="flex-1">
            <div className="flex gap-2 justify-center md:justify-start mt-4 md:mt-0">
            <span className="px-3 py-1 bg-[#00404f]/5 text-[#00404f] rounded-lg text-xs font-bold border border-[#00404f]/10">
              Nível {(user as any)?.level || 1}
            </span>
            <span className="px-3 py-1 bg-[#ffd166]/10 text-[#e0a800] rounded-lg text-xs font-bold border border-[#ffd166]/20">
              Streak {(user as any)?.streak || 0} 🔥
            </span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h4 className="font-bold text-[#00404f] mb-4">
            Informações Pessoais
          </h4>
          
          {/* Reuse ProfileForm Component */}
          <ProfileForm user={user} />
          
        </Card>

        <Card>
          <h4 className="font-bold text-[#00404f] mb-4">Conquistas</h4>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl flex items-center justify-center text-2xl border ${
                  i <= 3
                    ? "bg-[#ffd166]/10 border-[#ffd166]/30"
                    : "bg-[#F8FAFC] border-[#00404f]/5 opacity-50 grayscale"
                }`}
              >
                {i === 1 ? "🏆" : i === 2 ? "🚀" : i === 3 ? "💰" : "🔒"}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center gap-3 text-[#00404f] mb-6">
          <div className="p-2 bg-[#00404f]/5 rounded-lg">
            <Lock size={20} />
          </div>
          <h4 className="font-bold">Segurança</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h5 className="text-sm font-bold text-[#00404f]/60 uppercase mb-4">
              Alterar Senha
            </h5>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#00404f]/40 uppercase mb-1">
                  Senha Atual
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-[#F8FAFC] border border-[#00404f]/10 rounded-lg text-[#00404f] outline-none focus:border-[#3c88a0] transition-colors pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00404f]/40 hover:text-[#00404f] transition-colors"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-[#00404f]/40 uppercase mb-1">
                  Nova Senha
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-[#F8FAFC] border border-[#00404f]/10 rounded-lg text-[#00404f] outline-none focus:border-[#3c88a0] transition-colors pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00404f]/40 hover:text-[#00404f] transition-colors"
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                
                {/* Password Strength Meter */}
                {passwordForm.newPassword && (
                    <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] uppercase font-bold text-[#00404f]/60">Força da senha</span>
                            <span className={`text-[10px] font-bold ${strength.color.replace("bg-", "text-")}`}>{strength.label}</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#00404f]/10 rounded-full overflow-hidden">
                            <div 
                                className={`h-full ${strength.color} transition-all duration-300`} 
                                style={{ width: `${(strength.score / 4) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#00404f]/40 uppercase mb-1">
                  Confirmar Nova Senha
                </label>
                <div className="relative">
                  <input
                    type={showConfirmNewPassword ? "text" : "password"}
                    value={passwordForm.confirmNewPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmNewPassword: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-[#F8FAFC] border border-[#00404f]/10 rounded-lg text-[#00404f] outline-none focus:border-[#3c88a0] transition-colors pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmNewPassword(!showConfirmNewPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00404f]/40 hover:text-[#00404f] transition-colors"
                  >
                    {showConfirmNewPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="outline"
                disabled={isChangingPassword}
                className="w-full"
              >
                {isChangingPassword ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Alterando...
                  </>
                ) : (
                  "Atualizar Senha"
                )}
              </Button>
            </form>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-[#00404f]/10 pt-6 md:pt-0 md:pl-8">
            <h5 className="text-sm font-bold text-red-600/60 uppercase mb-4">
              Zona de Perigo
            </h5>
            <p className="text-sm text-[#00404f]/60 mb-6">
              Ao excluir sua conta, todos os seus dados serão perdidos
              permanentemente. Esta ação não pode ser desfeita.
            </p>
            <DeleteAccountModal />
          </div>
        </div>
      </Card>
    </div>
  );
}
