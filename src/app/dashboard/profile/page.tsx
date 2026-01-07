"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Lock, Loader2, Eye, EyeOff, User as UserIcon } from "lucide-react";
import styles from "@/components/dashboard/styles/Dashboard.module.css";
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
          <div className={styles.scrollableArea}>
              <div className="max-w-5xl mx-auto space-y-6">
                 <Skeleton className="h-8 w-40 mb-6 bg-white/5" />
                 <Skeleton className="h-[200px] w-full rounded-3xl bg-white/5" />
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Skeleton className="h-[300px] w-full rounded-2xl bg-white/5" />
                    <Skeleton className="h-[300px] w-full rounded-2xl bg-white/5" />
                 </div>
                 <Skeleton className="h-[400px] w-full rounded-2xl bg-white/5" />
              </div>
          </div>
      )
  }

  return (
    <div className={styles.scrollableArea}>
      <div className="max-w-5xl mx-auto space-y-8 pb-10">
        
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Meu Perfil</h2>
          <p className="text-gray-400">Gerencie suas informações pessoais e segurança</p>
        </div>

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#06181b] to-[#0a272b] border border-white/10 p-8 md:p-10 backdrop-blur-xl">
           <div className="absolute top-0 right-0 w-96 h-96 bg-[#32d6a5]/10 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
           
           <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
              <AvatarUpload user={user} />

              <div className="flex-1 text-center md:text-left space-y-6">
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <div className="px-4 py-2 bg-[#32d6a5]/10 text-[#32d6a5] rounded-xl text-sm font-bold border border-[#32d6a5]/20 flex items-center gap-2">
                        <span>🏆</span> Nível {(user as any)?.level || 1}
                    </div>
                    <div className="px-4 py-2 bg-orange-500/10 text-orange-400 rounded-xl text-sm font-bold border border-orange-500/20 flex items-center gap-2">
                        <span>🔥</span> Streak {(user as any)?.streak || 0} dias
                    </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                        <div className="text-2xl font-bold text-white mb-1">12</div>
                        <div className="text-xs text-gray-400 uppercase font-bold">Resumos</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                        <div className="text-2xl font-bold text-white mb-1">5</div>
                        <div className="text-xs text-gray-400 uppercase font-bold">Metas</div>
                    </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                        <div className="text-2xl font-bold text-white mb-1">85%</div>
                        <div className="text-xs text-gray-400 uppercase font-bold">Saúde</div>
                    </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                        <div className="text-2xl font-bold text-white mb-1">A+</div>
                        <div className="text-xs text-gray-400 uppercase font-bold">Score</div>
                    </div>
                </div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Info */}
            <div className="p-6 rounded-2xl bg-[#06181b] border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#32d6a5]/10 rounded-lg text-[#32d6a5]">
                        <UserIcon size={20} />
                    </div>
                    <h4 className="font-bold text-lg text-white">Informações Pessoais</h4>
                </div>
                <ProfileForm user={user} />
            </div>

            {/* Achievements */}
            <div className="p-6 rounded-2xl bg-[#06181b] border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
                         <span className="text-xl">🏆</span>
                    </div>
                    <h4 className="font-bold text-lg text-white">Conquistas Recentes</h4>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                        key={i}
                        className={`aspect-square rounded-2xl flex items-center justify-center text-3xl border transition-all hover:scale-105 cursor-pointer ${
                        i <= 3
                            ? "bg-linear-to-br from-[#32d6a5]/20 to-[#32d6a5]/5 border-[#32d6a5]/30 text-white shadow-lg shadow-[#32d6a5]/10"
                            : "bg-white/5 border-white/5 text-gray-600 grayscale opacity-50 hover:opacity-100 hover:grayscale-0"
                        }`}
                        title={i <= 3 ? "Conquistado!" : "Bloqueado"}
                    >
                        {i === 1 ? "🚀" : i === 2 ? "💰" : i === 3 ? "📊" : "🔒"}
                    </div>
                    ))}
                </div>
                <div className="mt-6 text-center">
                    <button className="text-sm text-[#32d6a5] hover:text-[#20bca3] font-medium transition-colors">
                        Ver todas as conquistas &rarr;
                    </button>
                </div>
            </div>
        </div>

        {/* Security Section */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#06181b] border border-white/10 relative overflow-hidden">
             <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                    <Lock size={20} />
                </div>
                <div>
                     <h4 className="font-bold text-lg text-white">Segurança & Privacidade</h4>
                     <p className="text-sm text-gray-400">Gerencie sua senha e acesso à conta</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                     <h5 className="text-xs font-bold text-[#32d6a5] uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                        Alterar Senha
                     </h5>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div>
                             <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
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
                                    className="w-full p-3 bg-[#020809] border border-white/10 rounded-xl text-white outline-none focus:border-[#32d6a5] transition-colors pr-10 hover:border-white/20"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                             </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
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
                                    className="w-full p-3 bg-[#020809] border border-white/10 rounded-xl text-white outline-none focus:border-[#32d6a5] transition-colors pr-10 hover:border-white/20"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            {/* Password Strength Meter */}
                            {passwordForm.newPassword && (
                                <div className="mt-3 bg-white/5 p-3 rounded-lg border border-white/5">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] uppercase font-bold text-gray-400">Força da senha</span>
                                        <span className={`text-[10px] font-bold ${strength.color.replace("bg-", "text-")}`}>{strength.label}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full ${strength.color} transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)]`} 
                                            style={{ width: `${(strength.score / 4) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
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
                                    className="w-full p-3 bg-[#020809] border border-white/10 rounded-xl text-white outline-none focus:border-[#32d6a5] transition-colors pr-10 hover:border-white/20"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showConfirmNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="pt-2">
                             <Button
                                type="submit"
                                disabled={isChangingPassword}
                                className="w-full bg-[#06181b] border border-[#32d6a5] text-[#32d6a5] hover:bg-[#32d6a5] hover:text-[#020809] transition-all font-bold h-12"
                            >
                                {isChangingPassword ? (
                                <>
                                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                    Atualizando...
                                </>
                                ) : (
                                "Atualizar Senha"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12 flex flex-col justify-center">
                    <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
                        <div className="flex items-center gap-3 mb-4 text-red-400">
                             <div className="p-2 bg-red-500/10 rounded-full"><Lock size={16} /></div>
                             <h5 className="font-bold text-sm uppercase tracking-wider">Zona de Perigo</h5>
                        </div>
                        
                        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                            Ao excluir sua conta, todos os seus dados (transações, contas, metas) serão perdidos
                            permanentemente. <span className="text-white font-medium">Esta ação não pode ser desfeita.</span>
                        </p>
                        
                        <DeleteAccountModal />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
